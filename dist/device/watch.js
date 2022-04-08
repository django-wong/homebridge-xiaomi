"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Watch extends device_1.default {
}
exports.default = Watch;
Watch.type = 'urn:miot-spec-v2:device:watch:0000A07C';
