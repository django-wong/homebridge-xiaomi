"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WeatherSensor extends device_1.default {
}
WeatherSensor.type = 'urn:miot-spec-v2:device:weather-sensor:0000A0A5';
exports.default = WeatherSensor;
