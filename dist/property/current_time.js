"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Current_time = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Current_time extends abstract_1.default {
    urn() {
        return Current_time.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.CurrentTime).onGet(() => {
            return (new Date()).toISOString();
        });
    }
}
exports.Current_time = Current_time;
Current_time.urn = '';
