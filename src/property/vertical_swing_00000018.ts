import AbstractProperty from "./abstract";

export class Vertical_swing_00000018 extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:vertical-swing:00000018';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.SwingMode).onGet(
            () => {
                return this.getPropertyValue();
            }
        ).onSet(
            (enabled) => {
                this.setPropertyValue(!!enabled)
            }
        )
    }

    urn(): string {
        return Vertical_swing_00000018.urn;
    }

}
