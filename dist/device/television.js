"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Televsion extends device_1.default {
}
Televsion.type = 'urn:miot-spec-v2:device:television:0000A010';
exports.default = Televsion;
