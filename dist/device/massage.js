"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Message extends device_1.default {
}
Message.type = 'urn:miot-spec-v2:device:massage:0000A018';
exports.default = Message;
