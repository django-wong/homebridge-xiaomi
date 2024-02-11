"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan_level_00000016 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Fan_level_00000016 extends abstract_1.default {
    get levels() {
        var _a;
        const values = (((_a = this.getPropertyDefinition()) === null || _a === void 0 ? void 0 : _a["value-list"]) || [{
                value: 0,
                description: "Auto"
            }]);
        return values.length - 1;
    }
    urn() {
        return Fan_level_00000016.urn;
    }
    init() {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(async () => {
            const value = await this.getPropertyValue();
            let speed = 0;
            if (this.levels > 0 && value) {
                speed = Math.ceil(value / this.levels * 100);
            }
            console.info(`Get fan speed: ${speed} <= ${value}`);
            return speed;
        }).onSet(async (value) => {
            if (typeof value === 'number') {
                let level = 0;
                if (this.levels > 0) {
                    level = Math.ceil(value / 100 * this.levels);
                }
                console.info(`Set fan level: ${value} => ${level}`);
                return this.setPropertyValue(level);
            }
        }).setProps({
            minStep: 1,
            minValue: 0,
            maxValue: 100
        });
    }
}
exports.Fan_level_00000016 = Fan_level_00000016;
Fan_level_00000016.urn = 'urn:miot-spec-v2:property:fan-level:00000016';
