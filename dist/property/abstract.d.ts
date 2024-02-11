import Service from "../service/abstract";
import { Characteristic } from "homebridge";
import InstanceProperty = MiIOSpec.InstanceProperty;
import { WithUUID } from "hap-nodejs/dist/types";
export type AnyHbCharacteristic = WithUUID<{
    new (): Characteristic;
}>;
export declare abstract class Property<T = any> {
    protected service: Service;
    constructor(service: Service, ...args: any[]);
    get Characteristic(): typeof Characteristic;
    getService(): import("homebridge").Service;
    abstract init(): void;
}
export declare abstract class DynamicProperty<T = any> extends Property<T> {
}
export default abstract class AbstractProperty<T = any> extends DynamicProperty<T> {
    protected service: Service;
    protected propertyDefinition?: InstanceProperty | undefined;
    static urn: string;
    constructor(service: Service, propertyDefinition?: InstanceProperty | undefined);
    get Characteristic(): typeof Characteristic;
    abstract urn(): string;
    abstract init(): void;
    getService(): import("homebridge").Service;
    getPropertyValue(defaultValue?: null): Promise<null>;
    setPropertyValue(value: any): Promise<void>;
    getPropertyDefinition(): InstanceProperty | undefined;
}
