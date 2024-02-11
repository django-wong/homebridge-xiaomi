"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Bed extends device_1.default {
}
Bed.type = 'urn:miot-spec-v2:device:bed:0000A06A';
exports.default = Bed;
