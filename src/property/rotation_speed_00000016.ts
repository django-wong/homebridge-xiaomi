import AbstractProperty from "./abstract";
import {Fan_level_00000016} from "./fan_level_00000016";

export class Rotation_speed_00000016 extends Fan_level_00000016 {
    static urn = 'urn:miot-spec-v2:property:fan-level:00000016';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(
            async () => {
                const value = await this.getPropertyValue();
                return this.value2percentage(value);
            }
        ).onSet(
            (percentage) => {
                if (typeof percentage === 'number') {
                    return this.setPropertyValue(this.percentage2value(percentage));
                }
            }
        ).setProps({
            minStep: 100/8,
            minValue: 0,
            maxValue: 100
        })
    }

    urn(): string {
        return super.urn();
    }

    percentage2value(percentage: number|null) {
        if (percentage == null) {
            return 0;
        }
        if (percentage == 0) {
            return 0;
        }
        return  Math.ceil(percentage / 100 * 8);
    }

    value2percentage(value: number|null) {
        if (value == null) {
            return 0;
        }
        if (value == 0) {
            return 100;
        }
        return Math.min(value, 8) / 8 * 100
    }
}
