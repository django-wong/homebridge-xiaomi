"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Projector extends device_1.default {
}
Projector.type = 'urn:miot-spec-v2:device:projector:0000A02C';
exports.default = Projector;
