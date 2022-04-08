"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvBox = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class TvBox extends abstract_1.default {
    getHbService() {
        throw new Error('Method not implemented');
    }
    urn() {
        return "urn:miot-spec-v2:device:tv-box:0000A020";
    }
}
exports.TvBox = TvBox;
TvBox.urn = 'urn:miot-spec-v2:device:tv-box:0000A020';
