"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Humidifier = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const active_00000006_1 = require("../property/active_00000006");
const current_humidifier_dehumidifier_on_1 = require("../property/current_humidifier_dehumidifier_on");
const target_humidifier_dehumidifier_state_on_1 = require("../property/target_humidifier_dehumidifier_state_on");
const humidity_1 = require("./environment/humidity");
const relative_humidity_0000000C_1 = require("../property/relative_humidity_0000000C");
const rotation_speed_00000016_1 = require("../property/rotation_speed_00000016");
class CurrentHumidity extends relative_humidity_0000000C_1.Relative_humidity_0000000C {
    async getPropertyValue(defaultValue = null) {
        const service = this.service.getAccessory().ofService(humidity_1.Humidity);
        if (service) {
            return service.getPropertyValue(this, defaultValue);
        }
        return null;
    }
}
class Humidifier extends abstract_1.default {
    urn() {
        return Humidifier.urn;
    }
    getHbService() {
        return this.hap.Service.HumidifierDehumidifier;
    }
    getRequiredProperties() {
        return [
            active_00000006_1.Active_00000006,
            current_humidifier_dehumidifier_on_1.CurrentHumidifierDehumidifierOn,
            target_humidifier_dehumidifier_state_on_1.Target_humidifier_dehumidifier_state_on
        ];
    }
    getDynamicProperties() {
        const propertis = super.getDynamicProperties();
        return [...propertis, CurrentHumidity];
    }
    getOptionalProperties() {
        return [
            rotation_speed_00000016_1.Rotation_speed_00000016
        ];
    }
}
exports.Humidifier = Humidifier;
Humidifier.urn = 'urn:miot-spec-v2:service:humidifier:00007818';
