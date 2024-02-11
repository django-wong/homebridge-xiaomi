import AbstractDevice from './abstract';
import * as Spec from '../spec';
import MiCloud from '../lib/micloud';
import InstanceService = MiIOSpec.InstanceService;

export type DeviceConfig = {
	name?: string, did: string, model: string, ip?: string, token?: string, port?: number
} & Record<string, any>;


export enum DeviceEvent {
	INITIALIZED = 'initialized',
	DISPOSED = 'disposed'
}

/**
 * This class describes a miot-compatible device with a few highlevel method to interacts with the device
 *
 * @class      Device (name)
 */
export default abstract class Device extends AbstractDevice {
	static type = 'unknown';

	protected _propertyRefreshTimer?: NodeJS.Timeout;

	public instanceDefinition: MiIOSpec.InstanceDefinition; // https://miot-spec.org/miot-spec-v2/instances?status=all
	public instanceFeatureDefinition?: MiIOSpec.Instance; // https://miot-spec.org/miot-spec-v2/instance?type=xxxx
	public deviceDefinition?: MiIOSpec.Device; // https://miot-spec.org/miot-spec-v2/spec/device?type=xxxx
	public inited: Promise<boolean>;

	protected miioDevice: Nullable<any> = null;

	protected propertyValues: GetPropertyResult[] = [];

	/**
	 * Constructs a new instance.
	 */
	constructor(protected config: DeviceConfig, protected miCloudApi: MiCloud) {
		super();
		this.instanceDefinition = this._readInstanceDefinition();
		this.inited = this._init();
	}

	get did() {
		return this.config.did;
	}

	/**
	 * Alias to this.inited
	 */
	get ready() {
		return this.inited;
	}

	get name() {
		return this.config.name;
	}

	get model() {
		return this.config.model;
	}

	/**
	 * Initializes this device
	 */
	private async _init(): Promise<boolean> {
		if (!this.miCloudApi.isLoggedIn) {
			throw new Error('You haven\'t login to xiaomi cloud')
		}

		try {
			await Promise.all([this._readFeatureDefinition(), this._readServiceDefinition(), this._initMiioDevice()]);
		} catch (e) {
			console.info(
				'Error captured on reading device definition'
			);
			throw e;
		}

		try {
			await this.onInit();
		} catch (e) {
			console.info(
				'Error captured on initialize device'
			);
		}

		try {
			await this._refreshPropertiesValue();
		} catch (e) {
			console.info(
				'Unable to refresh device state'
			);
		}

		this.emit(DeviceEvent.INITIALIZED);

		this._propertyRefreshTimer = setTimeout(() => this._refreshPropertiesValue(), 30000);
		return true;
	}

	/**
	 * Called on dispose. For example clean timers, cancel HTTP calls etc.
	 *
	 * @mustCallSuper
	 */
	onDispose() {
		this._propertyRefreshTimer && clearTimeout(this._propertyRefreshTimer);
		if (this.miioDevice?.destroyCallback != null) {
			this.miioDevice.destroyCallback();
		}
		this.emit(DeviceEvent.DISPOSED)
	}

	/**
	 * Called on initialize. You can override this method as a hook to the initialization process.
	 * DeviceEvent.INITIALIZED will emitted once the promise fulfilled
	 */
	async onInit() {}

	/**
	 * Reads the feature definition of this device.
	 */
	private async _readFeatureDefinition() {
		const res = await Spec.fetchInstanceFeatureDefinitionByType(this.instanceDefinition.type)
		if (res) {
			this.instanceFeatureDefinition = res;
		} else throw new Error(
			'Can not retrieve instance feature definition'
		)
	}

	/**
	 * Reads a service definition.
	 */
	private async _readServiceDefinition() {
		const res = await Spec.fetchDeviceDefinitionByType(this.instanceDefinition.type)
		if (res) {
			this.deviceDefinition = res;
		} else throw new Error(
			'Can not retrieve instance feature definition'
		)
	}

	/**
	 * Initializes the miio device instance.
	 */
	private async _initMiioDevice() {
		// const device = await Promise.race([
		// 	miio.device({
		// 		address: this.config.ip, port: this.config.port, token: this.config.token
		// 	}),
		// 	delayed(2000, null)
		// ])

		// if (device != null) {
		// 	this.miioDevice = device
		// }
	}

	/**
	 * Reads an instance definition.
	 */
	private _readInstanceDefinition() {
		const res = Spec.findInstanceByModel(
			this.config.model
		);
		if (res == undefined || !res.model) {
			throw new Error(
				'Can not read the instance definition from miot specification'
			)
		}
		return this.instanceDefinition = res;
	}

	/**
	 * Sets the property.
	 *
	 * @param      {SetPropertyOption}  option  The option
	 */
	public setProperty(option: SetPropertyOption) {
		return this.setProperties([option]);
	}

	/**
	 * Gets the property.
	 *
	 * @param      {GetPropertyOption}  option  The option
	 */
	public getProperty(option: GetPropertyOption) {
		return this.getProperties([option]);
	}

	/**
	 * Sets the properties.
	 *
	 * @param      {SetPropertyOption[]}  properties  The properties
	 */
	public async setProperties(properties: SetPropertyOption[]) {
		let params = properties.map((p) => {
			return {
				did: this.config.did || `property-${p.siid}-${p.piid}`,
				piid: p.piid,
				siid: p.siid,
				value: p.value
			};
		});
		// await this.miioDevice?.call('set_properties', params);
		return await this.miCloudApi.miotSetProps(params);
	}

	/**
	 * Gets the properties.
	 *
	 * @param      {GetPropertyOption[]}           properties  The properties
	 */
	public async getProperties(properties: GetPropertyOption[]): Promise<GetPropertyResult[]> {
		let params = properties.map((p) => {
			return {
				did: this.config.did || `property-${p.siid}-${p.piid}`,
				piid: p.piid,
				siid: p.siid,
			};
		});
		// return await this.miioDevice.call('get_properties', params)
		return await this.miCloudApi.miotGetProps(params);
	}

	/**
	 * Call to trigger an action
	 *
	 * @param      {CallActionOption}  options  The options
	 */
	public async callAction(options: CallActionOption) {
		await this.miCloudApi.miotAction(
			Object.assign({}, options, {did: this.config.did})
		)
	}

	/**
	 * Finds a property with an optional access level.
	 *
	 * @param      {number}                            siid                             The siid
	 * @param      {number}                            piid                             The piid
	 * @param      {string}                                  access?:MiIOSpec.PropertyAccess  The property access
	 */
	private findProperty(siid: number, piid: number, access?: MiIOSpec.PropertyAccess): MiIOSpec.InstanceProperty | null {
		let res: MiIOSpec.InstanceProperty | null = null;

		this.instanceFeatureDefinition?.services.find((service) => {
			if (service.iid == siid) {
				service.properties?.find((property) => {
					if (property.iid == piid) {
						res = property;
						return !access || property.access.includes(access);
					}
				})
			}
		});

		return res;
	}

	private findPropertyByType(serviceType: string, propertyType: string, access?: MiIOSpec.PropertyAccess): MiIOSpec.InstanceProperty | null {
		let res: MiIOSpec.InstanceProperty | null = null;

		this.instanceFeatureDefinition?.services.find((service) => {
			const st = service.type.split(':').splice(0, 5).join(':')
			if (st == serviceType) {
				service.properties?.find((property) => {
					const pt = property.type.split(':').splice(0, 5).join(':');
					if (pt == propertyType) {
						res = property;
						return !access || property.access.includes(access);
					}
				})
			}
		});

		return res;
	}

	/**
	 * Check the specified property can be read
	 *
	 * @param      {IID}  siid    The siid
	 * @param      {IID}  piid    The piid
	 */
	private _preReadCheck(siid: IID, piid: IID) {
		const property = this.findProperty(siid, piid, 'read');
		if (!property) {
			throw new Error(
				`Property<${siid}:${piid}> not found`
			);
		}
	}

	/**
	 * Check the specified property can be write to value
	 *
	 * @param      {IID}     siid        The siid
	 * @param      {IID}     piid        The piid
	 * @param      {<type>}  value?:any  The value any
	 */
	private _preWriteCheck(siid: IID, piid: IID, value?: any) {
		const property = this.findProperty(siid, piid, 'write');
		if (!property) {
			throw new Error(
				`Property<${siid}:${piid}> not found`
			);
		}
	}

	/**
	 * Find if device support specified service
	 * @param type // Can be either urn or service short id
	 */
	public findService(type: string): InstanceService | undefined {
		return this.instanceFeatureDefinition?.services.find((service) => {
			return service.type.indexOf(type) != -1 || service.type.split(':')[4] == type;
		});
	}

	/**
	 * Find if device support specified property of a service
	 * @param service
	 * @param type Can be either property urn or short id
	 */
	public findServiceProperty(service: InstanceService, type: string) {
		return service.properties?.find((property) => {
			return property.type.indexOf(type) != -1 || property.type.split(':')[4] == type;
		});
	}

	public findServiceAction(service: InstanceService, type: string) {
		return service.actions?.find((action) => {
			return action.type.indexOf(type) != -1 || action.type.split(':')[4] == type;
		});
	}

	/**
	 * Get all readable properties
	 *
	 * @type       {ComputedProperty[]}
	 */
	public getPropertiesByAccess(access: MiIOSpec.PropertyAccess): ComputedProperty[] {
		return this.instanceFeatureDefinition?.services.reduce((res: ComputedProperty[], service) => {
			service.properties?.forEach((property) => {
				property.access.includes(access) && res.push({
					did: this.config.did,
					siid: service.iid,
					piid: property.iid, format: property.format,
					description: property.description
				});
			});
			return res;
		}, []) ?? [];
	}

	/**
	 * Reads a property value by siid and piid.
	 *
	 * @param      {{siid:number, piid:number}}  options  The options
	 */
	readPropertyValue(options: {siid: number, piid: number}) {
		return this.propertyValues.find((item) => {
			return item.siid == options.siid && item.piid == options.piid;
		})
	}

	readPropertyValueByType(options: {service: string, property: string}) {

	}

	private setPropertyValue(result: GetPropertyResult) {
		const property = this.readPropertyValue(result);
		if (property) {
			property.value = result.value;
			property.updateTime = result.updateTime;
			property.code = result.code;
		} else {
			this.propertyValues.push(result);
		}
	}

	private async _refreshPropertiesValue() {
		const readableProperties = this.getPropertiesByAccess('read');
		const res = await this.getProperties(readableProperties);
		res.forEach((result) => {
			this.setPropertyValue(result);
		});
	}

	getServices() {
		return this.instanceFeatureDefinition?.services.map(
			(s) => s
		)
	}
}
