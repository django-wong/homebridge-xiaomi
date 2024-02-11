"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Doorbell extends device_1.default {
}
Doorbell.type = 'urn:miot-spec-v2:device:doorbell:0000A03B';
exports.default = Doorbell;
