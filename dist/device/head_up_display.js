"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class HeadUpDisplay extends device_1.default {
}
HeadUpDisplay.type = 'urn:miot-spec-v2:device:head-up-display:0000A09F';
exports.default = HeadUpDisplay;
