import {On_00000006} from "./on_00000006";

export class Active_00000006 extends On_00000006 {
    getCharacteristic() {
        return this.Characteristic.Active;
    }

    init() {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
            async () => {
                const value = await this.getPropertyValue();
                return value ? this.Characteristic.Active.ACTIVE : this.Characteristic.Active.INACTIVE;
            }
        ).onSet(
            async (active) => {
                await this.setPropertyValue(!!active);
                return active;
            }
        )
    }
}
