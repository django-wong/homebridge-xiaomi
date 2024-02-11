"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Vacuum extends device_1.default {
}
Vacuum.type = 'urn:miot-spec-v2:device:vacuum:0000A006';
exports.default = Vacuum;
