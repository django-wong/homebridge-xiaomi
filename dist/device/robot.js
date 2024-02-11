"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Robot extends device_1.default {
}
Robot.type = 'urn:miot-spec-v2:device:robot:0000A05D';
exports.default = Robot;
