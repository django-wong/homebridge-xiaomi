"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class CookingMachine extends device_1.default {
}
CookingMachine.type = 'urn:miot-spec-v2:device:cooking-machine:0000A058';
exports.default = CookingMachine;
