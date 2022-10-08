import AbstractProperty from "./abstract";
import { CharacteristicValue } from "homebridge";
export declare class Heater_cooler_state_00000008 extends AbstractProperty<number | false> {
    static urn: string;
    init(): void;
    urn(): string;
    value2state(value: number | false | null): 1 | 2 | 3 | 0;
    state2value(state: CharacteristicValue): 2 | 5 | 0;
}
