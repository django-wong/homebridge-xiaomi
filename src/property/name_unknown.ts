import AbstractProperty, {DynamicProperty} from "./abstract";

export class Name_unknown extends DynamicProperty<any> {
    init(): void {
        this.getService().getCharacteristic(this.Characteristic.Name).onGet(
            () => {
                return this.service.getPlatformAccessory().context.name;
            }
        )
    }
}
