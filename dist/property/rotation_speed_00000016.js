"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotation_speed_00000016 = void 0;
const fan_level_00000016_1 = require("./fan_level_00000016");
class Rotation_speed_00000016 extends fan_level_00000016_1.Fan_level_00000016 {
    init() {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(async () => {
            const value = await this.getPropertyValue();
            return this.value2percentage(value);
        }).onSet((percentage) => {
            if (typeof percentage === 'number') {
                return this.setPropertyValue(this.percentage2value(percentage));
            }
        }).setProps({
            minStep: 100 / 8,
            minValue: 0,
            maxValue: 100
        });
    }
    urn() {
        return super.urn();
    }
    percentage2value(percentage) {
        if (percentage == null) {
            return 0;
        }
        if (percentage == 0) {
            return 0;
        }
        return Math.ceil(percentage / 100 * 8);
    }
    value2percentage(value) {
        if (value == null) {
            return 0;
        }
        if (value == 0) {
            return 100;
        }
        return Math.min(value, 8) / 8 * 100;
    }
}
exports.Rotation_speed_00000016 = Rotation_speed_00000016;
Rotation_speed_00000016.urn = 'urn:miot-spec-v2:property:fan-level:00000016';
