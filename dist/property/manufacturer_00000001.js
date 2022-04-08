"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manufacturer_00000001 = void 0;
const readonly_1 = require("./lib/readonly");
class Manufacturer_00000001 extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.Manufacturer;
    }
    urn() {
        return Manufacturer_00000001.urn;
    }
}
exports.Manufacturer_00000001 = Manufacturer_00000001;
Manufacturer_00000001.urn = "urn:miot-spec-v2:property:manufacturer:00000001";
