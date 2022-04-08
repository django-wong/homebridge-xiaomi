"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speaker = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const mute_00000040_1 = require("../property/mute_00000040");
const volume_00000013_1 = require("../property/volume_00000013");
class Speaker extends abstract_1.default {
    getHbService() {
        return this.hap.Service.Speaker;
    }
    getRequiredProperties() {
        return [
            mute_00000040_1.Mute_00000040,
            volume_00000013_1.Volume_00000013
        ];
    }
    urn() {
        return Speaker.urn;
    }
}
exports.Speaker = Speaker;
Speaker.urn = 'urn:miot-spec-v2:service:speaker:0000781C';
