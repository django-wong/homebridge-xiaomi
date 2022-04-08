import AbstractProperty from "./abstract";

export class Target_temperature_00000021 extends AbstractProperty<number|boolean> {
    static urn = 'urn:miot-spec-v2:property:target-temperature:00000021';

    urn(): string {
        return Target_temperature_00000021.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.TargetTemperature).onGet(
            async () => {
                const value = await this.getPropertyValue()
                if (!value) {
                    return null;
                }
                return value;
            }
        ).onSet(
            (value) => {
                return this.setPropertyValue(parseInt(value.toString(), 10))
            }
        );
    }
}
