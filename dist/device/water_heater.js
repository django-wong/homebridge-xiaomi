"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WaterHeater extends device_1.default {
}
exports.default = WaterHeater;
WaterHeater.type = 'urn:miot-spec-v2:device:water-heater:0000A02A';
