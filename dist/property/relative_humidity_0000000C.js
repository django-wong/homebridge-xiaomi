"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relative_humidity_0000000C = void 0;
const readonly_1 = require("./lib/readonly");
class Relative_humidity_0000000C extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.CurrentRelativeHumidity;
    }
    urn() {
        return Relative_humidity_0000000C.urn;
    }
}
exports.Relative_humidity_0000000C = Relative_humidity_0000000C;
Relative_humidity_0000000C.urn = 'urn:miot-spec-v2:property:relative-humidity:0000000C';
