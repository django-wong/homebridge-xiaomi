"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan_level_00000016 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Fan_level_00000016 extends abstract_1.default {
    // Fan speed level, default to 1
    get level() {
        var _a;
        const valuelist = ((_a = this.getPropertyDefinition()) === null || _a === void 0 ? void 0 : _a["value-list"]) || [];
        return valuelist.length || 1;
    }
    urn() {
        return Fan_level_00000016.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(async () => {
            const value = await this.getPropertyValue();
            return value;
        }).onSet((value) => {
            if (typeof value === 'number') {
                return this.setPropertyValue(value);
            }
        }).setProps({
            minStep: 1,
            minValue: 0,
            maxValue: this.level
        });
    }
}
exports.Fan_level_00000016 = Fan_level_00000016;
Fan_level_00000016.urn = 'urn:miot-spec-v2:property:fan-level:00000016';
