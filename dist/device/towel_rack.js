"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class TowelRack extends device_1.default {
}
TowelRack.type = 'urn:miot-spec-v2:device:towel-rack:0000A09A';
exports.default = TowelRack;
