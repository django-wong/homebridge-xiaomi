import AbstractProperty from "./abstract";

export class Color_temperature_0000000F extends AbstractProperty<number> {
    static urn = 'urn:miot-spec-v2:property:color-temperature:0000000F';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.ColorTemperature).onGet(
            async () => {
                const kelvin = await this.getPropertyValue();
                if (typeof kelvin === 'number') {
                    return this.kelvin2temperature(kelvin);
                }
                return null;
            }
        ).onSet(
            (color_temperature) => {
                if (typeof color_temperature === 'number') {
                    return this.setPropertyValue(this.temperature2kelvin(color_temperature));
                }
            }
        );
    }

    urn(): string {
        return Color_temperature_0000000F.urn;
    }

    kelvin2temperature(kelvin: number) {
        return Math.floor(1000000 / kelvin);
    }

    temperature2kelvin(temperature: number) {
        console.info(1000000/temperature);
        const kelvin = Math.floor(1000000 / temperature);
        if (kelvin < 2700) {
            return 2700;
        }

        if (kelvin > 6500) {
            return 6500;
        }

        return kelvin;
    }
}
