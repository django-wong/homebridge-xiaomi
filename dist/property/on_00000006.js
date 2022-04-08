"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On_00000006 = void 0;
const read_write_1 = require("./lib/read_write");
class On_00000006 extends read_write_1.ReadWrite {
    getCharacteristic() {
        return this.Characteristic.On;
    }
    urn() {
        return On_00000006.urn;
    }
}
exports.On_00000006 = On_00000006;
On_00000006.urn = "urn:miot-spec-v2:property:on:00000006";
