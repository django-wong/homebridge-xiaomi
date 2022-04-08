"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Airer extends device_1.default {
}
exports.default = Airer;
Airer.type = 'urn:miot-spec-v2:device:airer:0000A00D';
