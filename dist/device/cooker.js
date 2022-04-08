"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Cooker extends device_1.default {
}
exports.default = Cooker;
Cooker.type = 'urn:miot-spec-v2:device:cooker:0000A00B';
