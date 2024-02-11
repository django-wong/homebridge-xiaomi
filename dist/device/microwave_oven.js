"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class MicrowaveOven extends device_1.default {
}
MicrowaveOven.type = 'urn:miot-spec-v2:device:microwave-oven:0000A032';
exports.default = MicrowaveOven;
