"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadWrite = void 0;
const readonly_1 = require("./readonly");
class ReadWrite extends readonly_1.Readonly {
    init() {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(async () => {
            return this.in(await this.getPropertyValue());
        }).onSet((value) => {
            return this.setPropertyValue(this.out(value));
        });
    }
    out(value) {
        return value;
    }
}
exports.ReadWrite = ReadWrite;
