"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Volume_00000013 = void 0;
const read_write_1 = require("./lib/read_write");
class Volume_00000013 extends read_write_1.ReadWrite {
    getCharacteristic() {
        return this.Characteristic.Volume;
    }
    urn() {
        return Volume_00000013.urn;
    }
}
exports.Volume_00000013 = Volume_00000013;
Volume_00000013.urn = 'urn:miot-spec-v2:property:volume:00000013';
