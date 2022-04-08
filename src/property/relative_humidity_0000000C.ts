import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";

export class Relative_humidity_0000000C extends Readonly<number> {
    static urn = 'urn:miot-spec-v2:property:relative-humidity:0000000C';

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.CurrentRelativeHumidity;
    }

    urn(): string {
        return Relative_humidity_0000000C.urn;
    }
}
