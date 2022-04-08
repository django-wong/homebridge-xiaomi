"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class StoryMachine extends device_1.default {
}
exports.default = StoryMachine;
StoryMachine.type = 'urn:miot-spec-v2:device:story-machine:0000A05B';
