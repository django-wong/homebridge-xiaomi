"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class CoffeeMachine extends device_1.default {
}
exports.default = CoffeeMachine;
CoffeeMachine.type = 'urn:miot-spec-v2:device:coffee-machine:0000A049';
