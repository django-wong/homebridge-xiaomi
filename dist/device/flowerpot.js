"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Flowerpot extends device_1.default {
}
Flowerpot.type = 'urn:miot-spec-v2:device:flowerpot:0000A047';
exports.default = Flowerpot;
