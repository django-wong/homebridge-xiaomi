"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class IlluminationSensor extends device_1.default {
}
IlluminationSensor.type = 'urn:miot-spec-v2:device:illumination-sensor:0000A029';
exports.default = IlluminationSensor;
