import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";
export declare class Relative_humidity_0000000C extends Readonly<number> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
