"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Mirror extends device_1.default {
}
exports.default = Mirror;
Mirror.type = 'urn:miot-spec-v2:device:mirror:0000A063';
