"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WalkingPad extends device_1.default {
}
WalkingPad.type = 'urn:miot-spec-v2:device:walking-pad:0000A02F';
exports.default = WalkingPad;
