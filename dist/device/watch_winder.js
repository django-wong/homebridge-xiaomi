"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class WatchWinder extends device_1.default {
}
WatchWinder.type = 'urn:miot-spec-v2:device:watch-winder:0000A0AF';
exports.default = WatchWinder;
