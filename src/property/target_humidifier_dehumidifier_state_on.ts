import AbstractProperty from "./abstract";

export class Target_humidifier_dehumidifier_state_on extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:on:00000006';

    urn(): string {
        return Target_humidifier_dehumidifier_state_on.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.TargetHumidifierDehumidifierState).onSet(
            (value) => {
                this.setPropertyValue(!!value);
            }
        ).setProps({
            minValue: 0,
            maxValue: 0,
            minStep: 1
        })
    }
}
