import Service from "../service/abstract";
import {Nullable, Characteristic} from "homebridge";
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;
import {WithUUID} from "hap-nodejs/dist/types";

export type AnyHbCharacteristic = WithUUID<{
    new (): Characteristic;
}>

export abstract class DynamicProperty {
    constructor(protected service: Service) {}

    get Characteristic() {
        return this.service.hap.Characteristic;
    }

    abstract urn(): string;

    abstract init(): void;
}

export default abstract class AbstractProperty<T extends PrimitiveValue = PrimitiveValue> {
    constructor(protected service: Service, protected propertyDefinition?: InstanceProperty) {}

    get Characteristic() {
        return this.service.hap.Characteristic;
    }

    abstract urn(): string;

    abstract init(): void;

    getService() {
        return this.service.getService();
    }

    getPropertyValue(defaultValue: Nullable<T> = null) {
        return this.service.getPropertyValue(this.urn(), defaultValue);
    }

    setPropertyValue(value: T) {
        return this.service.setPropertyValue(this.urn(), value);
    }

    getPropertyDefinition() {
        return this.propertyDefinition;
    }
}
