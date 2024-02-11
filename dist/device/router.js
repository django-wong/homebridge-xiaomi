"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Router extends device_1.default {
}
Router.type = 'urn:miot-spec-v2:device:router:0000A036';
exports.default = Router;
