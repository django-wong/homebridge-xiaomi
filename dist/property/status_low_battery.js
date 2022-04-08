"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusLowBattery = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class StatusLowBattery extends abstract_1.default {
    urn() {
        throw new Error('Method not implemented.');
    }
    init() {
        throw new Error('Method not implemented.');
    }
}
exports.StatusLowBattery = StatusLowBattery;
StatusLowBattery.urn = '';
