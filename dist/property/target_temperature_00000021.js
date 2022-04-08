"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target_temperature_00000021 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Target_temperature_00000021 extends abstract_1.default {
    urn() {
        return Target_temperature_00000021.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.TargetTemperature).onGet(async () => {
            const value = await this.getPropertyValue();
            if (!value) {
                return null;
            }
            return value;
        }).onSet((value) => {
            return this.setPropertyValue(parseInt(value.toString(), 10));
        });
    }
}
exports.Target_temperature_00000021 = Target_temperature_00000021;
Target_temperature_00000021.urn = 'urn:miot-spec-v2:property:target-temperature:00000021';
