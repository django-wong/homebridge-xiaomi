"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name_unknown = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Name_unknown extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.Name).onGet(() => {
            return this.service.getPlatformAccessory().context.name;
        });
    }
    urn() {
        return "";
    }
}
exports.Name_unknown = Name_unknown;
Name_unknown.urn = '';
