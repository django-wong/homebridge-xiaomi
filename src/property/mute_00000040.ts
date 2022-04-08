import {Readonly} from "./lib/readonly";
import {AnyHbCharacteristic} from "./abstract";

export class Mute_00000040 extends Readonly<boolean> {
    static urn = 'urn:miot-spec-v2:property:mute:00000040';

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.Mute;
    }

    urn(): string {
        return Mute_00000040.urn;
    }
}
