"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firmware_Revision_00000005 = void 0;
const readonly_1 = require("./lib/readonly");
class Firmware_Revision_00000005 extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.FirmwareRevision;
    }
    urn() {
        return Firmware_Revision_00000005.urn;
    }
}
exports.Firmware_Revision_00000005 = Firmware_Revision_00000005;
Firmware_Revision_00000005.urn = 'urn:miot-spec-v2:property:firmware-revision:00000005';
