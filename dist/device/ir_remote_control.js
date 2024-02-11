"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class IrRemoteControl extends device_1.default {
}
IrRemoteControl.type = 'urn:miot-spec-v2:device:ir-remote-control:0000A025';
exports.default = IrRemoteControl;
