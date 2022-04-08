import {On_00000006} from "./on_00000006";

export class Active_00000006 extends On_00000006 {
    getCharacteristic() {
        return this.Characteristic.Active;
    }

    init() {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
            () => {
                return this.getPropertyValue();
            }
        ).onSet(
            (active) => {
                return this.setPropertyValue(!!active);
            }
        )
    }
}
