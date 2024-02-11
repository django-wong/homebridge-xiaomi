"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./device"));
class Table extends device_1.default {
}
Table.type = 'urn:miot-spec-v2:device:table:0000A068';
exports.default = Table;
