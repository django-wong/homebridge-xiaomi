import AbstractProperty from "./abstract";

export class OnAsTargetHumidifierState extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:on:00000006';

    urn(): string {
        return OnAsTargetHumidifierState.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.TargetHumidifierDehumidifierState).onSet(
            (value) => {
                // Device will always ON when setting the target humidifier dehumidifier state
                this.setPropertyValue(true);
                return this.Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER;
            }
        ).setProps({
            validValues: [
                this.Characteristic.TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER
            ]
        })
    }
}
