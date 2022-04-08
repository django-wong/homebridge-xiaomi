import { API, Logging, PlatformConfig, DynamicPlatformPlugin, PlatformAccessory, UnknownContext } from "homebridge";
import MiCloud, {Device} from './lib/micloud';
import { findDriverForMiotDevice } from "./device";
import Accessory from "./accessory";

interface Config extends PlatformConfig {
	username?: string,
	password?: string,
	country?: AvailableCountry
	devices?: string[]
}


class MiCloudPlugin implements DynamicPlatformPlugin {
	static IDENTIFIER = 'homebridge-xiaomi-cloud';
	static NAME = 'MiCloud';

	private cachedPlatformAccessories: PlatformAccessory<Device>[] = [];
	private readonly micloud: MiCloud;

	private accessories: Accessory[] = [];

	constructor(private log: Logging, private config: Config, private api: API) {
		this.micloud = new MiCloud({
			debug: false,
			country: config.country || 'cn'
		});
		this.api.on('didFinishLaunching', async () => {
			await this.didFinishLaunching();
		});
	}

    configureAccessory(accessory: PlatformAccessory<Device>): void {
        this.cachedPlatformAccessories.push(accessory);
    }

	/**
	 * Helper function to find platform access by did or create new using did and name
	 * @private
	 * @param device
	 */
    private findOrCreateAccessory(device: Device): PlatformAccessory<Device> {
		let accessory = this.cachedPlatformAccessories.find((accessory) => {
			return accessory.context.did === device.did;
		});
		if (accessory) {
			return accessory;
		}
		this.log(`Create new accessory with name ${device.name} ${device.did}`);
		const uuid = this.api.hap.uuid.generate(device.did);
		accessory = new this.api.platformAccessory<Device>(device.name, uuid);
		accessory.context = device;
		this.api.registerPlatformAccessories(MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, [accessory]);
		return accessory;
	}

	/**
	 * Called automatically on plugin finish launching
	 */
    async didFinishLaunching() {
    	if (this.config.username && this.config.password) {
	    	await this.micloud.login(this.config?.username, this.config?.password)
	    	const devices = await this.micloud.getDevices([]);
			for (const device of devices) {
				await this.register(device);
			}
    	}
		this.cleanup();
    }

	/**
	 * To register or restore MiCloud device
	 * @param device
	 */
	private async register(device: Device) {
		if (!this.config.devices || this.config.devices.indexOf(device.did)  === -1) {
			console.info(`[${device.name}]: ${device.did} on <${device.model}>`);
			return;
		}
		this.log(`>>>> ${device.name}: ${device.model}`);
		const D = findDriverForMiotDevice(device);
		if (!D) {
			this.log('Unsupported device', device.name, device.model);
			return;
		}
		const d = new D(device, this.micloud);
		// It needs time to fetch device definition from MiCloud
		await d.inited;
		this.log(`${device.name} is inited`);
		const platformAccessory = this.findOrCreateAccessory(device);
		platformAccessory.context = device;
		const accessory = new Accessory(
			d, platformAccessory, this.api, this.log
		);
		this.accessories.push(accessory);
		this.log(`${this.accessories.length} accessories registered`);
	}

	/**
	 * Call this function at the end of initialization to unregister platform accessories that no longer exists in
	 * MiCloud account
	 */
	private cleanup() {
		this.cachedPlatformAccessories.forEach((cached) => {
			const exists = this.accessories.find((accessory) => {
				return accessory.did === cached.context.did;
			});
			if (!exists) {
				this.api.unregisterPlatformAccessories(
					MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, [cached]
				)
			}
		})
	}
}

export default function (api: API) {
	api.registerPlatform(MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, MiCloudPlugin)
}
