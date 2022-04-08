"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class SleepMonitor extends device_1.default {
}
exports.default = SleepMonitor;
SleepMonitor.type = 'urn:miot-spec-v2:device:sleep-monitor:0000A080';
