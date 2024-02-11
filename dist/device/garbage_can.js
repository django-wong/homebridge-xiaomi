"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class GarbageCan extends device_1.default {
}
GarbageCan.type = 'urn:miot-spec-v2:device:garbage-can:0000A03E';
exports.default = GarbageCan;
