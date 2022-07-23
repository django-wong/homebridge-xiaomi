import Service from "../service/abstract";
import { Nullable, Characteristic } from "homebridge";
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;
import { WithUUID } from "hap-nodejs/dist/types";
export declare type AnyHbCharacteristic = WithUUID<{
    new (): Characteristic;
}>;
export declare abstract class DynamicProperty {
    protected service: Service;
    constructor(service: Service);
    get Characteristic(): typeof Characteristic;
    abstract urn(): string;
    abstract init(): void;
}
export default abstract class AbstractProperty<T extends PrimitiveValue = PrimitiveValue> {
    protected service: Service;
    protected propertyDefinition?: InstanceProperty | undefined;
    constructor(service: Service, propertyDefinition?: InstanceProperty | undefined);
    get Characteristic(): typeof Characteristic;
    abstract urn(): string;
    abstract init(): void;
    getService(): import("homebridge").Service;
    getPropertyValue(defaultValue?: Nullable<T>): Promise<Nullable<T>>;
    setPropertyValue(value: T): Promise<void>;
    getPropertyDefinition(): InstanceProperty | undefined;
}
