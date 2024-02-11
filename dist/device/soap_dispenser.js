"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class SoapDispenser extends device_1.default {
}
SoapDispenser.type = 'urn:miot-spec-v2:device:soap-dispenser:0000A0B2';
exports.default = SoapDispenser;
