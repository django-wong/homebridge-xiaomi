import { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";
export declare class On_00000006 extends ReadWrite<boolean> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
