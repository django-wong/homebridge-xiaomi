"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Oven extends device_1.default {
}
Oven.type = 'urn:miot-spec-v2:device:oven:0000A04E';
exports.default = Oven;
