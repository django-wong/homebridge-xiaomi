"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class MotorController extends device_1.default {
}
MotorController.type = 'urn:miot-spec-v2:device:motor-controller:0000A01D';
exports.default = MotorController;
