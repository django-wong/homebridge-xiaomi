"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color_temperature_0000000F = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Color_temperature_0000000F extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.ColorTemperature).onGet(async () => {
            const kelvin = await this.getPropertyValue();
            if (typeof kelvin === 'number') {
                return this.kelvin2temperature(kelvin);
            }
            return null;
        }).onSet((color_temperature) => {
            if (typeof color_temperature === 'number') {
                return this.setPropertyValue(this.temperature2kelvin(color_temperature));
            }
        });
    }
    urn() {
        return Color_temperature_0000000F.urn;
    }
    kelvin2temperature(kelvin) {
        return Math.floor(1000000 / kelvin);
    }
    temperature2kelvin(temperature) {
        console.info(1000000 / temperature);
        const kelvin = Math.floor(1000000 / temperature);
        if (kelvin < 2700) {
            return 2700;
        }
        if (kelvin > 6500) {
            return 6500;
        }
        return kelvin;
    }
}
exports.Color_temperature_0000000F = Color_temperature_0000000F;
Color_temperature_0000000F.urn = 'urn:miot-spec-v2:property:color-temperature:0000000F';
