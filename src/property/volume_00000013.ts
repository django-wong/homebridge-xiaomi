import AbstractProperty, {AnyHbCharacteristic} from "./abstract";
import {ReadWrite} from "./lib/read_write";

export class Volume_00000013 extends ReadWrite<number> {
    static urn = 'urn:miot-spec-v2:property:volume:00000013';

        getCharacteristic(): AnyHbCharacteristic {
            return this.Characteristic.Volume;
        }

    urn(): string {
        return Volume_00000013.urn;
    }
}
