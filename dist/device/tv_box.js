"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class TVBox extends device_1.default {
}
TVBox.type = 'urn:miot-spec-v2:device:tv-box:0000A020';
exports.default = TVBox;
