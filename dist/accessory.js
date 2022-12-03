"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
class Accessory {
    constructor(device, accessory, api, log) {
        this.device = device;
        this.accessory = accessory;
        this.api = api;
        this.log = log;
        this.services = [];
        this.init();
    }
    get did() {
        return this.device.did;
    }
    async init() {
        await this.device.inited;
        // DeviceInformationService is required for every device
        const deviceInformationServiceDefinition = this.device.findService('urn:miot-spec-v2:service:device-information:00007801');
        if (!deviceInformationServiceDefinition) {
            throw new Error('Device is not ready yet.');
        }
        const definition = this.device.getServices();
        if (!definition) {
            throw new Error('Device is not ready yet.');
        }
        definition.forEach((definition) => {
            this.createService(definition);
        });
    }
    createService(definition) {
        const S = (0, service_1.findService)(definition);
        if (!S) {
            this.log.warn('No service found', definition.type, this.device.name, this.device.model);
            return;
        }
        this.log(S.name);
        this.services.push(new S(this, this.device, this.api, definition, this.services));
    }
    getServices() {
        return this.services;
    }
    getService(service) {
        return this.services.find(item => item instanceof service);
    }
    getPlatformAccessory() {
        return this.accessory;
    }
    ofService(name) {
        return this.services.find(service => service instanceof name);
    }
}
exports.default = Accessory;
