"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identify = void 0;
const _1 = __importDefault(require("."));
class Identify extends _1.default {
    urn() {
        return Identify.urn;
    }
}
exports.Identify = Identify;
Identify.urn = 'urn:miot-spec-v2:action:identify:00002801';
