"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WaterPurifier extends device_1.default {
}
WaterPurifier.type = 'urn:miot-spec-v2:device:water-purifier:0000A013';
exports.default = WaterPurifier;
