"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class FishTank extends device_1.default {
}
FishTank.type = 'urn:miot-spec-v2:device:fish-tank:0000A0A2';
exports.default = FishTank;
