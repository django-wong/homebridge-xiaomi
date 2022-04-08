import AbstractProperty, { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";

export class Firmware_Revision_00000005 extends Readonly<string> {
    static urn = 'urn:miot-spec-v2:property:firmware-revision:00000005';

    getCharacteristic(): AnyHbCharacteristic {
        return this.Characteristic.FirmwareRevision;
    }

    urn(): string {
        return Firmware_Revision_00000005.urn;
    }
}
