import AbstractProperty from "./abstract";

export class Name_unknown extends AbstractProperty {
    static urn = '';
    init(): void {
        this.getService().getCharacteristic(this.Characteristic.Name).onGet(
            () => {
                return this.service.getPlatformAccessory().context.name;
            }
        )
    }

    urn(): string {
        return "";
    }
}
