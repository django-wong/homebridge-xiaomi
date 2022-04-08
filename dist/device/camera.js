"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Camera extends device_1.default {
}
exports.default = Camera;
Camera.type = 'urn:miot-spec-v2:device:camera:0000A01C0000A0A4';
