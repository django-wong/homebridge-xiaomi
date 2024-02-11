"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Humidifier extends device_1.default {
}
Humidifier.type = 'urn:miot-spec-v2:device:humidifier:0000A00E';
exports.default = Humidifier;
