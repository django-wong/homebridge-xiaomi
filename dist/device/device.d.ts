/// <reference types="node" />
import AbstractDevice from './abstract';
import MiCloud from '../lib/micloud';
import InstanceService = MiIOSpec.InstanceService;
export type DeviceConfig = {
    name?: string;
    did: string;
    model: string;
    ip?: string;
    token?: string;
    port?: number;
} & Record<string, any>;
export declare enum DeviceEvent {
    INITIALIZED = "initialized",
    DISPOSED = "disposed"
}
/**
 * This class describes a miot-compatible device with a few highlevel method to interacts with the device
 *
 * @class      Device (name)
 */
export default abstract class Device extends AbstractDevice {
    protected config: DeviceConfig;
    protected miCloudApi: MiCloud;
    static type: string;
    protected _propertyRefreshTimer?: NodeJS.Timeout;
    instanceDefinition: MiIOSpec.InstanceDefinition;
    instanceFeatureDefinition?: MiIOSpec.Instance;
    deviceDefinition?: MiIOSpec.Device;
    inited: Promise<boolean>;
    protected miioDevice: Nullable<any>;
    protected propertyValues: GetPropertyResult[];
    /**
     * Constructs a new instance.
     */
    constructor(config: DeviceConfig, miCloudApi: MiCloud);
    get did(): string;
    /**
     * Alias to this.inited
     */
    get ready(): Promise<boolean>;
    get name(): string | undefined;
    get model(): string;
    /**
     * Initializes this device
     */
    private _init;
    /**
     * Called on dispose. For example clean timers, cancel HTTP calls etc.
     *
     * @mustCallSuper
     */
    onDispose(): void;
    /**
     * Called on initialize. You can override this method as a hook to the initialization process.
     * DeviceEvent.INITIALIZED will emitted once the promise fulfilled
     */
    onInit(): Promise<void>;
    /**
     * Reads the feature definition of this device.
     */
    private _readFeatureDefinition;
    /**
     * Reads a service definition.
     */
    private _readServiceDefinition;
    /**
     * Initializes the miio device instance.
     */
    private _initMiioDevice;
    /**
     * Reads an instance definition.
     */
    private _readInstanceDefinition;
    /**
     * Sets the property.
     *
     * @param      {SetPropertyOption}  option  The option
     */
    setProperty(option: SetPropertyOption): Promise<any>;
    /**
     * Gets the property.
     *
     * @param      {GetPropertyOption}  option  The option
     */
    getProperty(option: GetPropertyOption): Promise<GetPropertyResult[]>;
    /**
     * Sets the properties.
     *
     * @param      {SetPropertyOption[]}  properties  The properties
     */
    setProperties(properties: SetPropertyOption[]): Promise<any>;
    /**
     * Gets the properties.
     *
     * @param      {GetPropertyOption[]}           properties  The properties
     */
    getProperties(properties: GetPropertyOption[]): Promise<GetPropertyResult[]>;
    /**
     * Call to trigger an action
     *
     * @param      {CallActionOption}  options  The options
     */
    callAction(options: CallActionOption): Promise<void>;
    /**
     * Finds a property with an optional access level.
     *
     * @param      {number}                            siid                             The siid
     * @param      {number}                            piid                             The piid
     * @param      {string}                                  access?:MiIOSpec.PropertyAccess  The property access
     */
    private findProperty;
    private findPropertyByType;
    /**
     * Check the specified property can be read
     *
     * @param      {IID}  siid    The siid
     * @param      {IID}  piid    The piid
     */
    private _preReadCheck;
    /**
     * Check the specified property can be write to value
     *
     * @param      {IID}     siid        The siid
     * @param      {IID}     piid        The piid
     * @param      {<type>}  value?:any  The value any
     */
    private _preWriteCheck;
    /**
     * Find if device support specified service
     * @param type // Can be either urn or service short id
     */
    findService(type: string): InstanceService | undefined;
    /**
     * Find if device support specified property of a service
     * @param service
     * @param type Can be either property urn or short id
     */
    findServiceProperty(service: InstanceService, type: string): MiIOSpec.InstanceProperty | undefined;
    findServiceAction(service: InstanceService, type: string): MiIOSpec.InstanceAction | undefined;
    /**
     * Get all readable properties
     *
     * @type       {ComputedProperty[]}
     */
    getPropertiesByAccess(access: MiIOSpec.PropertyAccess): ComputedProperty[];
    /**
     * Reads a property value by siid and piid.
     *
     * @param      {{siid:number, piid:number}}  options  The options
     */
    readPropertyValue(options: {
        siid: number;
        piid: number;
    }): GetPropertyResult | undefined;
    readPropertyValueByType(options: {
        service: string;
        property: string;
    }): void;
    private setPropertyValue;
    private _refreshPropertiesValue;
    getServices(): InstanceService[] | undefined;
}
