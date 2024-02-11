"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class ClothesDryer extends device_1.default {
}
ClothesDryer.type = 'urn:miot-spec-v2:device:clothes-dryer:0000A06D';
exports.default = ClothesDryer;
