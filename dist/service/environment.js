"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const current_temperature_00000020_1 = require("../property/current_temperature_00000020");
class Environment extends abstract_1.default {
    getHbService() {
        return this.hap.Service.TemperatureSensor;
    }
    urn() {
        return Environment.urn;
    }
    getOptionalProperties() {
        return [
            current_temperature_00000020_1.CurrentTemperature_00000020,
            // Relative_humidity_0000000C,
            // Co2_density_0000004B
        ];
    }
}
exports.Environment = Environment;
Environment.urn = 'urn:miot-spec-v2:service:environment:0000780A';
