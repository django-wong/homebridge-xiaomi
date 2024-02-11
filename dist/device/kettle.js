"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Kettle extends device_1.default {
}
Kettle.type = 'urn:miot-spec-v2:device:kettle:0000A009';
exports.default = Kettle;
