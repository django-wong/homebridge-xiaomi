"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Active_00000006 = void 0;
const on_00000006_1 = require("./on_00000006");
class Active_00000006 extends on_00000006_1.On_00000006 {
    getCharacteristic() {
        return this.Characteristic.Active;
    }
    init() {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(async () => {
            const value = await this.getPropertyValue();
            return value ? this.Characteristic.Active.ACTIVE : this.Characteristic.Active.INACTIVE;
        }).onSet(async (active) => {
            await this.setPropertyValue(!!active);
            return active;
        });
    }
}
exports.Active_00000006 = Active_00000006;
