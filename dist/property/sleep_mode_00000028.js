"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sleep_mode_00000028 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Sleep_mode_00000028 extends abstract_1.default {
    init() {
    }
    urn() {
        return Sleep_mode_00000028.urn;
    }
}
exports.Sleep_mode_00000028 = Sleep_mode_00000028;
Sleep_mode_00000028.urn = 'urn:miot-spec-v2:property:sleep-mode:00000028';
