"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Fan extends device_1.default {
}
Fan.type = 'urn:miot-spec-v2:device:fan:0000A005';
exports.default = Fan;
