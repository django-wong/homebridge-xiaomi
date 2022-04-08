"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
// import { Service } from "homebridge";
const abstract_1 = __importDefault(require("./abstract"));
const on_00000006_1 = require("../property/on_00000006");
const brightness_0000000D_1 = require("../property/brightness_0000000D");
const color_temperature_0000000F_1 = require("../property/color_temperature_0000000F");
// import {OptionalProperties, RequiredProperties} from "../lib/decorator";
// import {On_00000006} from "../property/on_00000006";
// import {Brightness_0000000D} from "../property/brightness_0000000D";
// @RequiredProperties([
//     On_00000006
// ])
// @OptionalProperties([
//     Brightness_0000000D
// ])
class Light extends abstract_1.default {
    getRequiredProperties() {
        return [
            on_00000006_1.On_00000006
        ];
    }
    getOptionalProperties() {
        return [
            brightness_0000000D_1.Brightness_0000000D,
            color_temperature_0000000F_1.Color_temperature_0000000F
        ];
    }
    urn() {
        return Light.urn;
    }
    getHbService() {
        return this.hap.Service.Lightbulb;
    }
    initialize() { }
}
exports.Light = Light;
Light.urn = 'urn:miot-spec-v2:service:light:00007802';
