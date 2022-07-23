"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentHumidifierDehumidifierOn = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class CurrentHumidifierDehumidifierOn extends abstract_1.default {
    urn() {
        return CurrentHumidifierDehumidifierOn.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.CurrentHumidifierDehumidifierState).onGet(async () => {
            const is_on = await this.getPropertyValue();
            if (is_on) {
                return this.Characteristic.CurrentHumidifierDehumidifierState.HUMIDIFYING;
            }
            else {
                return this.Characteristic.CurrentHumidifierDehumidifierState.IDLE;
            }
        }).setProps({
            minValue: 1,
            maxValue: 2,
            minStep: 1
        });
    }
}
exports.CurrentHumidifierDehumidifierOn = CurrentHumidifierDehumidifierOn;
CurrentHumidifierDehumidifierOn.urn = 'urn:miot-spec-v2:property:on:00000006';
