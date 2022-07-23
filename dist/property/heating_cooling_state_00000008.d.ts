import AbstractProperty from "./abstract";
import { CharacteristicValue } from "homebridge";
export declare class Heating_cooling_state_00000008 extends AbstractProperty {
    static urn: string;
    init(): void;
    urn(): string;
    state2value(state: CharacteristicValue): 0 | 2 | 5;
    value2state(value: unknown): 3 | 1 | 2;
}
