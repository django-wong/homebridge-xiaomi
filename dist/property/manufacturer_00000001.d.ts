import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";
export declare class Manufacturer_00000001 extends Readonly<string> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
