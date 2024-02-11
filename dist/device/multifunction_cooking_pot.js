"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class MultifunctionCooking extends device_1.default {
}
MultifunctionCooking.type = 'urn:miot-spec-v2:device:multifunction-cooking-pot:0000A0A9';
exports.default = MultifunctionCooking;
