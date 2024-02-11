"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Pillow extends device_1.default {
}
Pillow.type = 'urn:miot-spec-v2:device:pillow:0000A0A0';
exports.default = Pillow;
