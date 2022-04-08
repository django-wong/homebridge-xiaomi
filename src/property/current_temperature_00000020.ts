import AbstractProperty from "./abstract";

export class CurrentTemperature_00000020 extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:temperature:00000020';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CurrentTemperature).onGet(
            () => {
                return this.getPropertyValue();
            }
        )
    }

    urn(): string {
        return CurrentTemperature_00000020.urn;
    }

}
