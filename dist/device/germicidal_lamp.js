"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Germicidal extends device_1.default {
}
Germicidal.type = 'urn:miot-spec-v2:device:germicidal-lamp:0000A09E';
exports.default = Germicidal;
