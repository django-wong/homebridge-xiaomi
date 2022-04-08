import { CharacteristicValue } from "homebridge";
import { AnyHbCharacteristic } from "../abstract";
import { Readonly } from "./readonly";
export declare abstract class ReadWrite<T extends MiIOSpec.PrimitiveValue> extends Readonly<T> {
    abstract getCharacteristic(): AnyHbCharacteristic;
    init(): void;
    out(value: CharacteristicValue): T;
}
