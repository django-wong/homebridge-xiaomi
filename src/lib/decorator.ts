import AbstractService from "../service/abstract";
import AbstractProperty from "../property/abstract";

export const OPTIONAL_PROPERTIES = Symbol('optional properties');
export const REQUIRED_PROPERTIES = Symbol('required properties');

// export function OptionalProperty<T extends { new (...args: any[]): {}}>(name: string) {
//     return function (constructor: T) {
//         console.info('register optional property', name);
//         constructor.prototype[OPTIONAL_PROPERTIES] = constructor.prototype[OPTIONAL_PROPERTIES] || [];
//         constructor.prototype[OPTIONAL_PROPERTIES].push(name);
//     }
// }
//
// export function RequiredProperty<T extends { new (...args: any[]): {}}>(name: string) {
//     return function (constructor: T) {
//         console.info('register optional property', name);
//         constructor.prototype[OPTIONAL_PROPERTIES] = constructor.prototype[OPTIONAL_PROPERTIES] || [];
//         constructor.prototype[OPTIONAL_PROPERTIES].push(name);
//     }
// }

export function Property(urn: string, required = false) {
    return function (target: AbstractService, propertyKey: string, descriptor: PropertyDescriptor) {
        const origin = descriptor.value

        descriptor.value = function (...params: any[]) {
            if (target.hasProperty(urn)) {
                origin(...params);
            } else {
                const message = `Device has no such property ${urn}`;
                if (required) {
                    throw new Error(message);
                } else {
                    console.info(message);
                }
            }
        }
    }
}


export function RequiredProperties<T extends { new (...args: any[]): any}>(propertiesConstructors: AbstractProperty[]) {
    return function (target: T) {
        return class extends target {
            [REQUIRED_PROPERTIES] = propertiesConstructors
        }
    }
}

export function OptionalProperties<T extends { new (...args: any[]): any}>(propertiesConstructors: AbstractProperty[]) {
    return function (target: T) {
        return class extends target {
            [OPTIONAL_PROPERTIES] = propertiesConstructors
        }
    }
}
