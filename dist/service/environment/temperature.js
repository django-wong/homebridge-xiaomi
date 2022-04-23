"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperature = void 0;
const abstract_1 = __importDefault(require("../abstract"));
const current_temperature_00000020_1 = require("../../property/current_temperature_00000020");
class Temperature extends abstract_1.default {
    getHbService() {
        return this.hap.Service.TemperatureSensor;
    }
    urn() {
        return "";
    }
    getOptionalProperties() {
        return [
            current_temperature_00000020_1.CurrentTemperature_00000020
        ];
    }
}
exports.Temperature = Temperature;
