"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micloud_1 = __importDefault(require("./lib/micloud"));
const device_1 = require("./device");
const accessory_1 = __importDefault(require("./accessory"));
class MiCloudPlugin {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.cachedPlatformAccessories = [];
        this.accessories = [];
        this.micloud = new micloud_1.default({
            debug: false,
            country: config.country || 'cn'
        });
        this.api.on('didFinishLaunching', async () => {
            await this.didFinishLaunching();
        });
    }
    configureAccessory(accessory) {
        this.cachedPlatformAccessories.push(accessory);
    }
    /**
     * Helper function to find platform access by did or create new using did and name
     * @private
     * @param device
     */
    findOrCreateAccessory(device) {
        let accessory = this.cachedPlatformAccessories.find((accessory) => {
            return accessory.context.did === device.did;
        });
        if (accessory) {
            return accessory;
        }
        this.log(`Create new accessory with name ${device.name} ${device.did}`);
        const uuid = this.api.hap.uuid.generate(device.did);
        accessory = new this.api.platformAccessory(device.name, uuid);
        accessory.context = device;
        this.api.registerPlatformAccessories(MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, [accessory]);
        return accessory;
    }
    /**
     * Called automatically on plugin finish launching
     */
    async didFinishLaunching() {
        var _a, _b;
        if (this.config.username && this.config.password) {
            await this.micloud.login((_a = this.config) === null || _a === void 0 ? void 0 : _a.username, (_b = this.config) === null || _b === void 0 ? void 0 : _b.password);
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
    async register(device) {
        if (!this.config.devices || this.config.devices.indexOf(device.did) === -1) {
            console.info(`[${device.name}]: ${device.did} on <${device.model}>`);
            return;
        }
        this.log(`>>>> ${device.name}: ${device.model}`);
        const D = (0, device_1.findDriverForMiotDevice)(device);
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
        const accessory = new accessory_1.default(d, platformAccessory, this.api, this.log);
        this.accessories.push(accessory);
        this.log(`${this.accessories.length} accessories registered`);
    }
    /**
     * Call this function at the end of initialization to unregister platform accessories that no longer exists in
     * MiCloud account
     */
    cleanup() {
        this.cachedPlatformAccessories.forEach((cached) => {
            const exists = this.accessories.find((accessory) => {
                return accessory.did === cached.context.did;
            });
            if (!exists) {
                this.api.unregisterPlatformAccessories(MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, [cached]);
            }
        });
    }
}
MiCloudPlugin.IDENTIFIER = 'homebridge-xiaomi-cloud';
MiCloudPlugin.NAME = 'MiCloud';
function default_1(api) {
    api.registerPlatform(MiCloudPlugin.IDENTIFIER, MiCloudPlugin.NAME, MiCloudPlugin);
}
exports.default = default_1;
