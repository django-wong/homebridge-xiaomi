"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name_unknown = void 0;
const abstract_1 = require("./abstract");
class Name_unknown extends abstract_1.DynamicProperty {
    init() {
        this.getService().getCharacteristic(this.Characteristic.Name).onGet(() => {
            return this.service.getPlatformAccessory().context.name;
        });
    }
}
exports.Name_unknown = Name_unknown;
