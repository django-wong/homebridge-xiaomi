"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class FootBath extends device_1.default {
}
FootBath.type = 'urn:miot-spec-v2:device:foot-bath:0000A08D';
exports.default = FootBath;
