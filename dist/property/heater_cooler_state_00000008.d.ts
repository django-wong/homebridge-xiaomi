import AbstractProperty from "./abstract";
import { CharacteristicValue } from "homebridge";
export declare class Heater_cooler_state_00000008 extends AbstractProperty<number | false> {
    static urn: string;
    init(): void;
    urn(): string;
    value2state(value: number | false | null): 0 | 2 | 1 | 3;
    state2value(state: CharacteristicValue): 0 | 2 | 5;
}
