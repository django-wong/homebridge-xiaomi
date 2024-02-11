"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Washer extends device_1.default {
}
Washer.type = 'urn:miot-spec-v2:device:washer:0000A01F';
exports.default = Washer;
