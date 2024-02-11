"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Juicer extends device_1.default {
}
Juicer.type = 'urn:miot-spec-v2:device:juicer:0000A04D';
exports.default = Juicer;
