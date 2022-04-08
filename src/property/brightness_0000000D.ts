import { CharacteristicValue } from "homebridge";
import AbstractProperty, { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";

export class Brightness_0000000D extends ReadWrite<number> {
    static urn = 'urn:miot-spec-v2:property:brightness:0000000D';

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.Brightness
    }

    urn(): string {
        return Brightness_0000000D.urn;
    }

    in(value: Nullable<number>): Nullable<number> {
        return value;
    }

    out(value: CharacteristicValue): number {
        return parseInt(value.toString(), 10);
    }
}
