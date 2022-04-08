import { CharacteristicValue } from "homebridge";
import { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";
export declare class Brightness_0000000D extends ReadWrite<number> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
    in(value: Nullable<number>): Nullable<number>;
    out(value: CharacteristicValue): number;
}
