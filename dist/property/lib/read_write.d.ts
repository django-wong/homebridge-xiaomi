import { CharacteristicValue } from "homebridge";
import { AnyHbCharacteristic } from "../abstract";
import { Readonly } from "./readonly";
export declare abstract class ReadWrite<T = any> extends Readonly<T> {
    abstract getCharacteristic(): AnyHbCharacteristic;
    init(): void;
    out(value: CharacteristicValue): T;
}
