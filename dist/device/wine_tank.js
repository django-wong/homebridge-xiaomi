"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WineTank extends device_1.default {
}
WineTank.type = 'urn:miot-spec-v2:device:wine-tank:0000A0A6';
exports.default = WineTank;
