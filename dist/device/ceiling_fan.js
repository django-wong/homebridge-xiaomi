"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class CeilingFan extends device_1.default {
}
CeilingFan.type = 'urn:miot-spec-v2:device:ceiling-fan:0000A059';
exports.default = CeilingFan;
