"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battery_level_low_00000014 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Battery_level_low_00000014 extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.StatusLowBattery).onGet(async () => {
            const value = await this.getPropertyValue();
            if (!value || value <= 20) {
                return this.Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW;
            }
            return this.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
        });
    }
    urn() {
        return Battery_level_low_00000014.urn;
    }
}
exports.Battery_level_low_00000014 = Battery_level_low_00000014;
Battery_level_low_00000014.urn = 'urn:miot-spec-v2:property:battery-level:00000014';
