import Property from "./abstract";
import { CharacteristicValue } from "homebridge";
export declare class Mode_00000008 extends Property {
    static urn: string;
    init(): void;
    urn(): string;
    state2value(state: CharacteristicValue): 0 | 2 | 5;
    value2state(value: unknown): 3 | 2 | 1;
}
