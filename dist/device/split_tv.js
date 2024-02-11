"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class SplitTV extends device_1.default {
}
SplitTV.type = 'urn:miot-spec-v2:device:split-tv:0000A02B';
exports.default = SplitTV;
