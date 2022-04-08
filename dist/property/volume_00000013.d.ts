import { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";
export declare class Volume_00000013 extends ReadWrite<number> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
}
