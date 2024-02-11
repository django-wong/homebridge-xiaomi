"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceEvent = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const Spec = __importStar(require("../spec"));
var DeviceEvent;
(function (DeviceEvent) {
    DeviceEvent["INITIALIZED"] = "initialized";
    DeviceEvent["DISPOSED"] = "disposed";
})(DeviceEvent || (exports.DeviceEvent = DeviceEvent = {}));
/**
 * This class describes a miot-compatible device with a few highlevel method to interacts with the device
 *
 * @class      Device (name)
 */
class Device extends abstract_1.default {
    /**
     * Constructs a new instance.
     */
    constructor(config, miCloudApi) {
        super();
        this.config = config;
        this.miCloudApi = miCloudApi;
        this.miioDevice = null;
        this.propertyValues = [];
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
    async _init() {
        if (!this.miCloudApi.isLoggedIn) {
            throw new Error('You haven\'t login to xiaomi cloud');
        }
        try {
            await Promise.all([this._readFeatureDefinition(), this._readServiceDefinition(), this._initMiioDevice()]);
        }
        catch (e) {
            console.info('Error captured on reading device definition');
            throw e;
        }
        try {
            await this.onInit();
        }
        catch (e) {
            console.info('Error captured on initialize device');
        }
        try {
            await this._refreshPropertiesValue();
        }
        catch (e) {
            console.info('Unable to refresh device state');
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
        var _a;
        this._propertyRefreshTimer && clearTimeout(this._propertyRefreshTimer);
        if (((_a = this.miioDevice) === null || _a === void 0 ? void 0 : _a.destroyCallback) != null) {
            this.miioDevice.destroyCallback();
        }
        this.emit(DeviceEvent.DISPOSED);
    }
    /**
     * Called on initialize. You can override this method as a hook to the initialization process.
     * DeviceEvent.INITIALIZED will emitted once the promise fulfilled
     */
    async onInit() { }
    /**
     * Reads the feature definition of this device.
     */
    async _readFeatureDefinition() {
        const res = await Spec.fetchInstanceFeatureDefinitionByType(this.instanceDefinition.type);
        if (res) {
            this.instanceFeatureDefinition = res;
        }
        else
            throw new Error('Can not retrieve instance feature definition');
    }
    /**
     * Reads a service definition.
     */
    async _readServiceDefinition() {
        const res = await Spec.fetchDeviceDefinitionByType(this.instanceDefinition.type);
        if (res) {
            this.deviceDefinition = res;
        }
        else
            throw new Error('Can not retrieve instance feature definition');
    }
    /**
     * Initializes the miio device instance.
     */
    async _initMiioDevice() {
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
    _readInstanceDefinition() {
        const res = Spec.findInstanceByModel(this.config.model);
        if (res == undefined || !res.model) {
            throw new Error('Can not read the instance definition from miot specification');
        }
        return this.instanceDefinition = res;
    }
    /**
     * Sets the property.
     *
     * @param      {SetPropertyOption}  option  The option
     */
    setProperty(option) {
        return this.setProperties([option]);
    }
    /**
     * Gets the property.
     *
     * @param      {GetPropertyOption}  option  The option
     */
    getProperty(option) {
        return this.getProperties([option]);
    }
    /**
     * Sets the properties.
     *
     * @param      {SetPropertyOption[]}  properties  The properties
     */
    async setProperties(properties) {
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
    async getProperties(properties) {
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
    async callAction(options) {
        await this.miCloudApi.miotAction(Object.assign({}, options, { did: this.config.did }));
    }
    /**
     * Finds a property with an optional access level.
     *
     * @param      {number}                            siid                             The siid
     * @param      {number}                            piid                             The piid
     * @param      {string}                                  access?:MiIOSpec.PropertyAccess  The property access
     */
    findProperty(siid, piid, access) {
        var _a;
        let res = null;
        (_a = this.instanceFeatureDefinition) === null || _a === void 0 ? void 0 : _a.services.find((service) => {
            var _a;
            if (service.iid == siid) {
                (_a = service.properties) === null || _a === void 0 ? void 0 : _a.find((property) => {
                    if (property.iid == piid) {
                        res = property;
                        return !access || property.access.includes(access);
                    }
                });
            }
        });
        return res;
    }
    findPropertyByType(serviceType, propertyType, access) {
        var _a;
        let res = null;
        (_a = this.instanceFeatureDefinition) === null || _a === void 0 ? void 0 : _a.services.find((service) => {
            var _a;
            const st = service.type.split(':').splice(0, 5).join(':');
            if (st == serviceType) {
                (_a = service.properties) === null || _a === void 0 ? void 0 : _a.find((property) => {
                    const pt = property.type.split(':').splice(0, 5).join(':');
                    if (pt == propertyType) {
                        res = property;
                        return !access || property.access.includes(access);
                    }
                });
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
    _preReadCheck(siid, piid) {
        const property = this.findProperty(siid, piid, 'read');
        if (!property) {
            throw new Error(`Property<${siid}:${piid}> not found`);
        }
    }
    /**
     * Check the specified property can be write to value
     *
     * @param      {IID}     siid        The siid
     * @param      {IID}     piid        The piid
     * @param      {<type>}  value?:any  The value any
     */
    _preWriteCheck(siid, piid, value) {
        const property = this.findProperty(siid, piid, 'write');
        if (!property) {
            throw new Error(`Property<${siid}:${piid}> not found`);
        }
    }
    /**
     * Find if device support specified service
     * @param type // Can be either urn or service short id
     */
    findService(type) {
        var _a;
        return (_a = this.instanceFeatureDefinition) === null || _a === void 0 ? void 0 : _a.services.find((service) => {
            return service.type.indexOf(type) != -1 || service.type.split(':')[4] == type;
        });
    }
    /**
     * Find if device support specified property of a service
     * @param service
     * @param type Can be either property urn or short id
     */
    findServiceProperty(service, type) {
        var _a;
        return (_a = service.properties) === null || _a === void 0 ? void 0 : _a.find((property) => {
            return property.type.indexOf(type) != -1 || property.type.split(':')[4] == type;
        });
    }
    findServiceAction(service, type) {
        var _a;
        return (_a = service.actions) === null || _a === void 0 ? void 0 : _a.find((action) => {
            return action.type.indexOf(type) != -1 || action.type.split(':')[4] == type;
        });
    }
    /**
     * Get all readable properties
     *
     * @type       {ComputedProperty[]}
     */
    getPropertiesByAccess(access) {
        var _a, _b;
        return (_b = (_a = this.instanceFeatureDefinition) === null || _a === void 0 ? void 0 : _a.services.reduce((res, service) => {
            var _a;
            (_a = service.properties) === null || _a === void 0 ? void 0 : _a.forEach((property) => {
                property.access.includes(access) && res.push({
                    did: this.config.did,
                    siid: service.iid,
                    piid: property.iid, format: property.format,
                    description: property.description
                });
            });
            return res;
        }, [])) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * Reads a property value by siid and piid.
     *
     * @param      {{siid:number, piid:number}}  options  The options
     */
    readPropertyValue(options) {
        return this.propertyValues.find((item) => {
            return item.siid == options.siid && item.piid == options.piid;
        });
    }
    readPropertyValueByType(options) {
    }
    setPropertyValue(result) {
        const property = this.readPropertyValue(result);
        if (property) {
            property.value = result.value;
            property.updateTime = result.updateTime;
            property.code = result.code;
        }
        else {
            this.propertyValues.push(result);
        }
    }
    async _refreshPropertiesValue() {
        const readableProperties = this.getPropertiesByAccess('read');
        const res = await this.getProperties(readableProperties);
        res.forEach((result) => {
            this.setPropertyValue(result);
        });
    }
    getServices() {
        var _a;
        return (_a = this.instanceFeatureDefinition) === null || _a === void 0 ? void 0 : _a.services.map((s) => s);
    }
}
Device.type = 'unknown';
exports.default = Device;
