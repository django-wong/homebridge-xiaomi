"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirPurifier = void 0;
const active_00000006_1 = require("../property/active_00000006");
const abstract_1 = __importDefault(require("./abstract"));
class AirPurifier extends abstract_1.default {
    urn() {
        return AirPurifier.urn;
    }
    getHbService() {
        return this.hap.Service.AirPurifier;
    }
    getRequiredProperties() {
        return [
            active_00000006_1.Active_00000006,
        ];
    }
    initialize() {
        const service = this.getService();
        service.getCharacteristic(this.hap.Characteristic.CurrentAirPurifierState).onGet(async () => {
            const active = await this.getPropertyValue(active_00000006_1.Active_00000006);
            return active
                ? this.hap.Characteristic.CurrentAirPurifierState.PURIFYING_AIR
                : this.hap.Characteristic.CurrentAirPurifierState.INACTIVE;
        });
        service.getCharacteristic(this.hap.Characteristic.TargetAirPurifierState).onSet((state) => {
            this.targetAirpurifierState = state;
            return state;
        }).onGet(() => {
            return this.targetAirpurifierState == null
                ? this.hap.Characteristic.TargetAirPurifierState.AUTO
                : this.targetAirpurifierState;
        });
    }
}
exports.AirPurifier = AirPurifier;
AirPurifier.urn = 'urn:miot-spec-v2:service:air-purifier:00007811';
