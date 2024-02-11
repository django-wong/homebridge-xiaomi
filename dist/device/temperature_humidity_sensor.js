"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class TemperatureHumiditySensor extends device_1.default {
}
TemperatureHumiditySensor.type = 'urn:miot-spec-v2:device:temperature-humidity-sensor:0000A00A';
exports.default = TemperatureHumiditySensor;
