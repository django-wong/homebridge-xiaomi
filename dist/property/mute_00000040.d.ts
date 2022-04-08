import { Readonly } from "./lib/readonly";
import { AnyHbCharacteristic } from "./abstract";
export declare class Mute_00000040 extends Readonly<boolean> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
