import { AnyHbCharacteristic } from "./abstract";
import { Readonly } from "./lib/readonly";
import { Nullable } from "homebridge";
export declare class Serial_number_00000003 extends Readonly<string> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
    in(value: Nullable<string>): string;
}
