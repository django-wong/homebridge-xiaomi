"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heating_cooling_state_00000008 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const on_00000006_1 = require("./on_00000006");
class Heating_cooling_state_00000008 extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.CurrentHeatingCoolingState).onGet(async () => {
            const isOn = await this.service.getPropertyValue(on_00000006_1.On_00000006, false);
            if (!isOn) {
                return this.Characteristic.CurrentHeatingCoolingState.OFF;
            }
            const value = await this.getPropertyValue();
            return this.value2state(value);
        });
        this.getService().getCharacteristic(this.Characteristic.TargetHeatingCoolingState).onGet(async () => {
            const isOn = await this.service.getPropertyValue(on_00000006_1.On_00000006, false);
            if (!isOn) {
                return this.Characteristic.CurrentHeatingCoolingState.OFF;
            }
            const value = await this.getPropertyValue();
            if (!value) {
                return this.Characteristic.TargetHeatingCoolingState.OFF;
            }
            return this.value2state(value);
        }).onSet(async (value) => {
            switch (value) {
                case this.Characteristic.TargetHeatingCoolingState.OFF:
                    return this.service.setPropertyValue(on_00000006_1.On_00000006.urn, false);
                default:
                    await this.service.setPropertyValue(on_00000006_1.On_00000006.urn, true);
                    return this.setPropertyValue(this.state2value(value));
            }
        });
    }
    urn() {
        return Heating_cooling_state_00000008.urn;
    }
    state2value(state) {
        switch (state) {
            case this.Characteristic.TargetHeatingCoolingState.OFF:
                throw new Error('unsupported');
            case this.Characteristic.TargetHeatingCoolingState.HEAT:
                return 5;
            case this.Characteristic.TargetHeatingCoolingState.COOL:
                return 2;
            case this.Characteristic.TargetHeatingCoolingState.AUTO:
                return 0;
            default:
                throw new Error('unsupported');
        }
    }
    value2state(value) {
        // 2 = Cool
        // 5 = Heat
        // 4 = Fan
        // 3 = Dry
        // 0 = Auto
        // 1 = Unknown
        switch (value) {
            case 2:
                return this.Characteristic.TargetHeatingCoolingState.COOL;
            case 5:
                return this.Characteristic.TargetHeatingCoolingState.HEAT;
            case 4:
            case 3:
            case 0:
                return this.Characteristic.TargetHeatingCoolingState.AUTO;
            default:
                throw new Error('unsupported');
        }
    }
}
exports.Heating_cooling_state_00000008 = Heating_cooling_state_00000008;
Heating_cooling_state_00000008.urn = 'urn:miot-spec-v2:property:mode:00000008';
