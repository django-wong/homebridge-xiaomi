"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Alertor extends device_1.default {
}
Alertor.type = 'urn:miot-spec-v2:device:alertor:0000A040';
exports.default = Alertor;
