"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class SubmersionSensor extends device_1.default {
}
SubmersionSensor.type = 'urn:miot-spec-v2:device:submersion-sensor:0000A024';
exports.default = SubmersionSensor;
