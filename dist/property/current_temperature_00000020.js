"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentTemperature_00000020 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class CurrentTemperature_00000020 extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.CurrentTemperature).onGet(() => {
            return this.getPropertyValue();
        });
    }
    urn() {
        return CurrentTemperature_00000020.urn;
    }
}
exports.CurrentTemperature_00000020 = CurrentTemperature_00000020;
CurrentTemperature_00000020.urn = 'urn:miot-spec-v2:property:temperature:00000020';
