"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Fridge extends device_1.default {
}
Fridge.type = 'urn:miot-spec-v2:device:fridge:0000A00F';
exports.default = Fridge;
