import AbstractProperty from "./abstract";

export class Fan_level_00000016 extends AbstractProperty<number> {
    static urn = 'urn:miot-spec-v2:property:fan-level:00000016';

    get levels() {
        const values: Array<{value: any, description: string}> = (this.getPropertyDefinition()?.["value-list"] || [{
            value: 0,
            description: "Auto"
        }]);

        return values.length - 1;
    }

    urn(): string {
        return Fan_level_00000016.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(
            async () => {
                const value = await this.getPropertyValue();
                let speed = 0;
                if (this.levels > 0 && value) {
                    speed = Math.ceil(value / this.levels * 100);
                }
                console.info(`Get fan speed: ${speed} <= ${value}`);
                return speed;
            }
        ).onSet(
            async (value) => {
                if (typeof value === 'number') {
                    let level = 0;
                    if (this.levels > 0) {
                        level = Math.ceil(value / 100 * this.levels);
                    }
                    console.info(`Set fan level: ${value} => ${level}`);
                    return this.setPropertyValue(level);
                }
            }
        ).setProps({
            minStep: 1,
            minValue: 0,
            maxValue: 100
        })
    }
}
