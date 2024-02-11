import Service from "../service/abstract";
import {Nullable, Characteristic} from "homebridge";
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;
import {WithUUID} from "hap-nodejs/dist/types";

export type AnyHbCharacteristic = WithUUID<{
    new (): Characteristic;
}>

export abstract class Property<T = any> {
    constructor(protected service: Service, ...args: any[]) {}

    get Characteristic() {
        return this.service.hap.Characteristic;
    }

    getService() {
        return this.service.getService();
    }

    abstract init(): void;
}


export abstract class DynamicProperty<T = any> extends Property<T> {

}

export default abstract class AbstractProperty<T = any> extends DynamicProperty<T> {
    static urn: string;

    constructor(protected service: Service, protected propertyDefinition?: InstanceProperty) {
        super(service);
    }

    get Characteristic() {
        return this.service.hap.Characteristic;
    }

    abstract urn(): string;

    abstract init(): void;

    getService() {
        return this.service.getService();
    }

    getPropertyValue(defaultValue = null) {
        return this.service.getPropertyValue(this.urn(), defaultValue);
    }

    setPropertyValue(value: any) {
        return this.service.setPropertyValue(this.urn(), value);
    }

    getPropertyDefinition() {
        return this.propertyDefinition;
    }
}
