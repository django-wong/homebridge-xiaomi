import AbstractProperty, { AnyHbCharacteristic } from "../abstract";
export declare abstract class Readonly<T extends MiIOSpec.PrimitiveValue> extends AbstractProperty<T> {
    abstract getCharacteristic(): AnyHbCharacteristic;
    init(): void;
    in(value: Nullable<T>): Nullable<T>;
}
