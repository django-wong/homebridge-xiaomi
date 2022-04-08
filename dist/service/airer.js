"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airer = void 0;
const motor_control_00000038_1 = require("../property/motor_control_00000038");
const abstract_1 = __importDefault(require("./abstract"));
class Airer extends abstract_1.default {
    urn() {
        return Airer.urn;
    }
    getHbService() {
        throw new Error('Not Implemented');
    }
    getDynamicProperties() {
        return [];
    }
    getRequiredProperties() {
        return [
            motor_control_00000038_1.Motor_control_00000038
        ];
    }
}
exports.Airer = Airer;
Airer.urn = 'urn:miot-spec-v2:service:airer:00007817';
