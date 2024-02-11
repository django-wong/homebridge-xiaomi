"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class BeautyInstrument extends device_1.default {
}
BeautyInstrument.type = 'urn:miot-spec-v2:device:beauty-instrument:0000A0B0';
exports.default = BeautyInstrument;
