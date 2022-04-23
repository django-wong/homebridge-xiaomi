import AbstractProperty from "./abstract";

export class Battery_level_low_00000014 extends AbstractProperty<number> {
    static urn = 'urn:miot-spec-v2:property:battery-level:00000014';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.StatusLowBattery).onGet(
            async () => {
                const value = await this.getPropertyValue();
                if (!value || value <= 20) {
                    return this.Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW;
                }
                return this.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
            }
        )
    }

    urn(): string {
        return Battery_level_low_00000014.urn;
    }
}
