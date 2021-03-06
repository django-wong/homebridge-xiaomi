"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serial_number_00000003 = void 0;
const readonly_1 = require("./lib/readonly");
class Serial_number_00000003 extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.SerialNumber;
    }
    urn() {
        return Serial_number_00000003.urn;
    }
    in(value) {
        return (value === null || value === void 0 ? void 0 : value.toString().substring(0, 63)) || 'unknown';
    }
}
exports.Serial_number_00000003 = Serial_number_00000003;
Serial_number_00000003.urn = "urn:miot-spec-v2:property:serial-number:00000003";
