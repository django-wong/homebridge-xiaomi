"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heater_cooler_state_00000008 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Heater_cooler_state_00000008 extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.CurrentHeaterCoolerState).onGet(async () => {
            const value = await this.getPropertyValue();
            return this.value2state(value);
        });
        this.getService().getCharacteristic(this.Characteristic.TargetHeaterCoolerState).onGet(async () => {
            const value = await this.getPropertyValue();
            return this.value2state(value);
        }).onSet((state) => {
            return this.setPropertyValue(this.state2value(state));
        });
    }
    urn() {
        return Heater_cooler_state_00000008.urn;
    }
    value2state(value) {
        switch (value) {
            case 2:
                return this.Characteristic.CurrentHeaterCoolerState.COOLING;
            case 5:
                return this.Characteristic.CurrentHeaterCoolerState.HEATING;
            case 3:
            case 4:
                return this.Characteristic.CurrentHeaterCoolerState.IDLE;
            case 0:
                throw new Error(`unable to convert ${value} heater cooler state`);
            default:
                return this.Characteristic.CurrentHeaterCoolerState.INACTIVE;
        }
    }
    state2value(state) {
        switch (state) {
            case this.Characteristic.TargetHeaterCoolerState.HEAT:
                return 5;
            case this.Characteristic.TargetHeaterCoolerState.COOL:
                return 2;
            case this.Characteristic.TargetHeaterCoolerState.AUTO:
            default:
                return 0;
        }
    }
}
exports.Heater_cooler_state_00000008 = Heater_cooler_state_00000008;
Heater_cooler_state_00000008.urn = 'urn:miot-spec-v2:property:mode:00000008';
