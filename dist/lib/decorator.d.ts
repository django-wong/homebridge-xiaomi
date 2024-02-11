import AbstractService from "../service/abstract";
import AbstractProperty from "../property/abstract";
export declare const OPTIONAL_PROPERTIES: unique symbol;
export declare const REQUIRED_PROPERTIES: unique symbol;
export declare function Property(urn: string, required?: boolean): (target: AbstractService, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function RequiredProperties<T extends {
    new (...args: any[]): any;
}>(propertiesConstructors: AbstractProperty[]): (target: T) => {
    new (...args: any[]): {
        [x: string]: any;
        [REQUIRED_PROPERTIES]: AbstractProperty<any>[];
    };
} & T;
export declare function OptionalProperties<T extends {
    new (...args: any[]): any;
}>(propertiesConstructors: AbstractProperty[]): (target: T) => {
    new (...args: any[]): {
        [x: string]: any;
        [OPTIONAL_PROPERTIES]: AbstractProperty<any>[];
    };
} & T;
