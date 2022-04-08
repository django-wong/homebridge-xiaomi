"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class RemoteControl extends device_1.default {
}
exports.default = RemoteControl;
RemoteControl.type = 'urn:miot-spec-v2:device:remote-control:0000A021';
