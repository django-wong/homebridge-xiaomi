"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Readonly = void 0;
const abstract_1 = __importDefault(require("../abstract"));
class Readonly extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(async () => {
            return this.in(await this.getPropertyValue());
        });
    }
    in(value) {
        return value;
    }
}
exports.Readonly = Readonly;
