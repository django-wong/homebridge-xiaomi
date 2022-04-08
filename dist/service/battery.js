"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battery = void 0;
const battery_level_00000014_1 = require("../property/battery_level_00000014");
const abstract_1 = __importDefault(require("./abstract"));
class Battery extends abstract_1.default {
    urn() {
        return Battery.urn;
    }
    getHbService() {
        return this.hap.Service.Battery;
    }
    getRequiredProperties() {
        return [
            battery_level_00000014_1.Battery_level_00000014
        ];
    }
}
exports.Battery = Battery;
Battery.urn = 'urn:miot-spec-v2:service:battery:00007805';
