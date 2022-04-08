import AbstractProperty from "./abstract";
import {CharacteristicValue, Nullable} from "homebridge";

export class Heater_cooler_state_00000008 extends AbstractProperty<number|false> {
    static urn = 'urn:miot-spec-v2:property:mode:00000008';

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CurrentHeaterCoolerState).onGet(
            async () => {
                const value = await this.getPropertyValue();
                return this.value2state(value);
            }
        );

        this.getService().getCharacteristic(this.Characteristic.TargetHeaterCoolerState).onGet(
            async () => {
                const value = await this.getPropertyValue();
                return this.value2state(value);
            }
        ).onSet(
            (state) => {
                return this.setPropertyValue(this.state2value(state));
            }
        )
    }

    urn(): string {
        return Heater_cooler_state_00000008.urn;
    }

    value2state(value: number|false|null) {
        switch (value) {
            case 2:
                return this.Characteristic.CurrentHeaterCoolerState.COOLING;
            case 5:
                return this.Characteristic.CurrentHeaterCoolerState.HEATING;
            case 3:
            case 4:
                return this.Characteristic.CurrentHeaterCoolerState.IDLE;
            case 0:
                throw new Error(`unable to convert ${value} heater cooler state`);
            default:
                return this.Characteristic.CurrentHeaterCoolerState.INACTIVE
        }
    }

    state2value(state: CharacteristicValue) {
        switch (state) {
            case this.Characteristic.TargetHeaterCoolerState.HEAT:
                return 5;
            case this.Characteristic.TargetHeaterCoolerState.COOL:
                return 2;
            case this.Characteristic.TargetHeaterCoolerState.AUTO:
            default:
                return 0;
        }
    }
}
