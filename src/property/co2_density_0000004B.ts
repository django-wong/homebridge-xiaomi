import AbstractProperty from "./abstract";

export class Co2_density_0000004B extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:co2-density:0000004B';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CarbonDioxideLevel).onGet(
            () => {
                return this.getPropertyValue()
            }
        )
    }

    urn(): string {
        return Co2_density_0000004B.urn;
    }

}
