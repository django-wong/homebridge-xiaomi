"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Stb extends device_1.default {
}
Stb.type = 'urn:miot-spec-v2:device:stb:0000A011';
exports.default = Stb;
