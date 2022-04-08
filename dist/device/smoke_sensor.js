"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class SmokeSensor extends device_1.default {
}
exports.default = SmokeSensor;
SmokeSensor.type = 'urn:miot-spec-v2:device:smoke-sensor:0000A023';
