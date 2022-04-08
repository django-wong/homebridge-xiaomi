import AbstractProperty, { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";

export class Manufacturer_00000001 extends Readonly<string> {
    static urn = "urn:miot-spec-v2:property:manufacturer:00000001";

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.Manufacturer;
    }

    urn(): string {
        return Manufacturer_00000001.urn;
    }
}
