"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Outlet extends device_1.default {
}
Outlet.type = 'urn:miot-spec-v2:device:outlet:0000A002';
exports.default = Outlet;
