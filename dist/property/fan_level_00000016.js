"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan_level_00000016 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Fan_level_00000016 extends abstract_1.default {
    urn() {
        return Fan_level_00000016.urn;
    }
    init() {
        throw new Error("Method not implemented.");
    }
}
exports.Fan_level_00000016 = Fan_level_00000016;
Fan_level_00000016.urn = 'urn:miot-spec-v2:property:fan-level:00000016';
