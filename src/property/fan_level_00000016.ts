import AbstractProperty from "./abstract";

export class Fan_level_00000016 extends AbstractProperty<number> {
    static urn = 'urn:miot-spec-v2:property:fan-level:00000016';

    // Fan speed level, default to 1
    get level() {
        const valuelist = this.getPropertyDefinition()?.["value-list"] || [];
        return valuelist.length || 1;
    }

    urn(): string {
        return Fan_level_00000016.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.RotationSpeed).onGet(
            async () => {
                const value = await this.getPropertyValue();
                return value;
            }
        ).onSet(
            (value) => {
                if (typeof value === 'number') {
                    return this.setPropertyValue(value);
                }
            }
        ).setProps({
            minStep: 1,
            minValue: 0,
            maxValue: this.level
        })
    }
}
