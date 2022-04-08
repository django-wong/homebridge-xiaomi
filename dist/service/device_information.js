"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInformation = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const serial_number_00000003_1 = require("../property/serial_number_00000003");
const manufacturer_00000001_1 = require("../property/manufacturer_00000001");
const firmware_revision_00000005_1 = require("../property/firmware_revision_00000005");
const model_00000002_1 = require("../property/model_00000002");
class DeviceInformation extends abstract_1.default {
    urn() {
        return DeviceInformation.urn;
    }
    getRequiredProperties() {
        return [
            serial_number_00000003_1.Serial_number_00000003,
            manufacturer_00000001_1.Manufacturer_00000001,
            firmware_revision_00000005_1.Firmware_Revision_00000005,
            model_00000002_1.Model_00000002
        ];
    }
    getHbService() {
        return this.api.hap.Service.AccessoryInformation;
    }
    getService() {
        return this.getPlatformAccessory().getService(this.getHbService());
    }
    initialize() {
        this._identify();
        this._name();
    }
    _identify() {
        const service = this.getService();
        service.getCharacteristic(this.hap.Characteristic.Identify).onSet(() => {
            console.info('identify is not implemented');
        });
    }
    _name() {
        const service = this.getService();
        service.getCharacteristic(this.hap.Characteristic.Name).onGet(() => {
            return this.device.name || "No Name";
        });
    }
}
exports.DeviceInformation = DeviceInformation;
DeviceInformation.urn = 'urn:miot-spec-v2:service:device-information:00007801';
