"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Curtain extends device_1.default {
}
Curtain.type = 'urn:miot-spec-v2:device:curtain:0000A00C';
exports.default = Curtain;
