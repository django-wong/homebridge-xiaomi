"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mute_00000040 = void 0;
const readonly_1 = require("./lib/readonly");
class Mute_00000040 extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.Mute;
    }
    urn() {
        return Mute_00000040.urn;
    }
}
exports.Mute_00000040 = Mute_00000040;
Mute_00000040.urn = 'urn:miot-spec-v2:property:mute:00000040';
