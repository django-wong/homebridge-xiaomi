"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Repeater extends device_1.default {
}
Repeater.type = 'urn:miot-spec-v2:device:repeater:0000A037';
exports.default = Repeater;
