import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";
export declare class Model_00000002 extends Readonly<string> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
