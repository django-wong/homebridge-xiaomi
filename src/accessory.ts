import Device from "./device/device";
import {API, Logging, PlatformAccessory} from "homebridge";
import {Device as AccessoryContext} from "./lib/micloud";

import AbstractService from "./service/abstract";
import {findService} from "./service";
import InstanceService = MiIOSpec.InstanceService;

export default class Accessory {
    private services: AbstractService[] = [];
    constructor(private device: Device, private accessory: PlatformAccessory<AccessoryContext>, private api: API, private log: Logging) {
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
            throw new Error('Device is not ready yet.')
        }

        const definition = this.device.getServices();
        if (!definition) {
            throw new Error('Device is not ready yet.')
        }

        definition.forEach((definition) => {
            this.createService(definition)
        });
    }

    createService(definition: InstanceService) {
        const S = findService(definition);
        if (!S) {
            this.log.warn('No service found', definition.type, this.device.name, this.device.model);
            return
        }
        this.log(S.name);
        this.services.push(new S(this, this.device, this.api, definition, this.services));
    }

    getServices() {
        return this.services;
    }

    getPlatformAccessory() {
        return this.accessory;
    }

    ofService(name: typeof AbstractService) {
        return this.services.find(service => service instanceof name);
    }
}
