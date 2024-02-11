"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class ElectricBlanket extends device_1.default {
}
ElectricBlanket.type = 'urn:miot-spec-v2:device:electric-blanket:0000A069';
exports.default = ElectricBlanket;
