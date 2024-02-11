"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class ElectronicValve extends device_1.default {
}
ElectronicValve.type = 'urn:miot-spec-v2:device:electronic-valve:0000A0A7';
exports.default = ElectronicValve;
