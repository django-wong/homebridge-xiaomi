"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECO = void 0;
const read_write_1 = require("./lib/read_write");
class ECO extends read_write_1.ReadWrite {
    urn() {
        return ECO.urn;
    }
    getCharacteristic() {
        return this.Characteristic.On;
    }
    getService() {
        const accessory = this.service.getPlatformAccessory();
        const service = accessory.getServiceById(this.service.hap.Service.Switch, this.urn());
        if (service) {
            return service;
        }
        return accessory.addService(this.service.hap.Service.Switch, 'ECO', this.urn());
    }
}
exports.ECO = ECO;
ECO.urn = 'urn:miot-spec-v2:property:eco:00000024';
