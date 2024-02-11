"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Dryer extends device_1.default {
}
Dryer.type = 'urn:miot-spec-v2:device:dryer:0000A0A3';
exports.default = Dryer;
