"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class BodyBottleWarmer extends device_1.default {
}
BodyBottleWarmer.type = 'urn:miot-spec-v2:device:baby-bottle-warmer:0000A0AC';
exports.default = BodyBottleWarmer;
