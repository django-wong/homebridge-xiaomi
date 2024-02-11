"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Toilet extends device_1.default {
}
Toilet.type = 'urn:miot-spec-v2:device:toilet:0000A02E';
exports.default = Toilet;
