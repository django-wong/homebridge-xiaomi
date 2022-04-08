"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model_00000002 = void 0;
const readonly_1 = require("./lib/readonly");
class Model_00000002 extends readonly_1.Readonly {
    getCharacteristic() {
        return this.Characteristic.Model;
    }
    urn() {
        return Model_00000002.urn;
    }
}
exports.Model_00000002 = Model_00000002;
Model_00000002.urn = "urn:miot-spec-v2:property:model:00000002";
