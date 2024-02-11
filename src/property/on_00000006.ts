import { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";

export class On_00000006 extends ReadWrite {
    static urn = "urn:miot-spec-v2:property:on:00000006";

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.On;
    }

    urn(): string {
        return On_00000006.urn;
    }
}
