"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAsTargetHumidifierState = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class OnAsTargetHumidifierState extends abstract_1.default {
    urn() {
        return OnAsTargetHumidifierState.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.TargetHumidifierDehumidifierState).onSet((value) => {
            // Device will always ON when setting the target humidifier dehumidifier state
            this.setPropertyValue(true);
            return this.Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER;
        }).setProps({
            validValues: [
                this.Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER
            ]
        });
    }
}
exports.OnAsTargetHumidifierState = OnAsTargetHumidifierState;
OnAsTargetHumidifierState.urn = 'urn:miot-spec-v2:property:on:00000006';
