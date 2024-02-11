import AbstractProperty, {DynamicProperty} from "./abstract";
import {Vertical_swing_00000018} from "./vertical_swing_00000018";
import {Horizontal_swing_00000018} from "./horizontal_swing_00000018";

export class HorizontalOrVerticalSwing extends DynamicProperty {
    urn() {
        if (this.service.hasProperty(Horizontal_swing_00000018.urn)) {
            return Horizontal_swing_00000018.urn;
        }

        if (this.service.hasProperty(Vertical_swing_00000018.urn)) {
            return Vertical_swing_00000018.urn;
        }
        throw new Error('No swing property found');
    }


    init(): void {
        try {
            const urn = this.urn();
            this.getService().getCharacteristic(this.Characteristic.SwingMode).onGet(async () => {
                const value = await this.service.getPropertyValue(urn)
                return !!value;
            }).onSet(async (value) => {
                await this.service.setPropertyValue(urn, !!value);
                return value;
            })
        } catch (e) {
            return;
        }
    }
}
