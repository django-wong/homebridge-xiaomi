"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class MotionSensor extends device_1.default {
}
MotionSensor.type = 'urn:miot-spec-v2:device:motion-sensor:0000A014';
exports.default = MotionSensor;
