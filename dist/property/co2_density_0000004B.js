"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Co2_density_0000004B = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Co2_density_0000004B extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.CarbonDioxideLevel).onGet(() => {
            return this.getPropertyValue();
        });
    }
    urn() {
        return Co2_density_0000004B.urn;
    }
}
exports.Co2_density_0000004B = Co2_density_0000004B;
Co2_density_0000004B.urn = 'urn:miot-spec-v2:property:co2-density:0000004B';
