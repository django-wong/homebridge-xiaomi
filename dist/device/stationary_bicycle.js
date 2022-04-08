"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class StationaryBicycle extends device_1.default {
}
exports.default = StationaryBicycle;
StationaryBicycle.type = 'urn:miot-spec-v2:device:stationary-bicycle:0000A0AE';
