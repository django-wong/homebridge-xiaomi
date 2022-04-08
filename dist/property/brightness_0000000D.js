"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brightness_0000000D = void 0;
const read_write_1 = require("./lib/read_write");
class Brightness_0000000D extends read_write_1.ReadWrite {
    getCharacteristic() {
        return this.Characteristic.Brightness;
    }
    urn() {
        return Brightness_0000000D.urn;
    }
    in(value) {
        return value;
    }
    out(value) {
        return parseInt(value.toString(), 10);
    }
}
exports.Brightness_0000000D = Brightness_0000000D;
Brightness_0000000D.urn = 'urn:miot-spec-v2:property:brightness:0000000D';
