import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";

export class Model_00000002 extends Readonly<string> {
    static urn = "urn:miot-spec-v2:property:model:00000002"

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.Model;
    }

    urn(): string {
        return Model_00000002.urn;
    }
}
