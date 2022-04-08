"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Dimmer extends device_1.default {
}
exports.default = Dimmer;
Dimmer.type = 'urn:miot-spec-v2:device:dimmer:0000A03C';
