"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target_humidifier_dehumidifier_state_on = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Target_humidifier_dehumidifier_state_on extends abstract_1.default {
    urn() {
        return Target_humidifier_dehumidifier_state_on.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.TargetHumidifierDehumidifierState).onSet((value) => {
            this.setPropertyValue(!!value);
        }).setProps({
            minValue: 0,
            maxValue: 0,
            minStep: 1
        });
    }
}
exports.Target_humidifier_dehumidifier_state_on = Target_humidifier_dehumidifier_state_on;
Target_humidifier_dehumidifier_state_on.urn = 'urn:miot-spec-v2:property:on:00000006';
