"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class CardSwitch extends device_1.default {
}
CardSwitch.type = 'urn:miot-spec-v2:device:card-switch:0000A0AA';
exports.default = CardSwitch;
