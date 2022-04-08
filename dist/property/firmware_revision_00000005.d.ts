import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";
export declare class Firmware_Revision_00000005 extends Readonly<string> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
