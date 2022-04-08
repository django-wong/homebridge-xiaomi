import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";

export class Serial_number_00000003 extends Readonly<string> {
    static urn = "urn:miot-spec-v2:property:serial-number:00000003";

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.SerialNumber;
    }

    urn(): string {
        return Serial_number_00000003.urn;
    }
}
