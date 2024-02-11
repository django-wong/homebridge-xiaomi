"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WaterDispenser extends device_1.default {
}
WaterDispenser.type = 'urn:miot-spec-v2:device:water-dispenser:0000A0A1';
exports.default = WaterDispenser;
