"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class ControlPanel extends device_1.default {
}
ControlPanel.type = 'urn:miot-spec-v2:device:control-panel:0000A099';
exports.default = ControlPanel;
