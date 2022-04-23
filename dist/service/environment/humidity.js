"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Humidity = void 0;
const abstract_1 = __importDefault(require("../abstract"));
const relative_humidity_0000000C_1 = require("../../property/relative_humidity_0000000C");
class Humidity extends abstract_1.default {
    getHbService() {
        return this.hap.Service.HumiditySensor;
    }
    urn() {
        return "";
    }
    getOptionalProperties() {
        return [
            relative_humidity_0000000C_1.Relative_humidity_0000000C
        ];
    }
}
exports.Humidity = Humidity;
