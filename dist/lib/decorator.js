"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalProperties = exports.RequiredProperties = exports.Property = exports.REQUIRED_PROPERTIES = exports.OPTIONAL_PROPERTIES = void 0;
exports.OPTIONAL_PROPERTIES = Symbol('optional properties');
exports.REQUIRED_PROPERTIES = Symbol('required properties');
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
function Property(urn, required = false) {
    return function (target, propertyKey, descriptor) {
        const origin = descriptor.value;
        descriptor.value = function (...params) {
            if (target.hasProperty(urn)) {
                origin(...params);
            }
            else {
                const message = `Device has no such property ${urn}`;
                if (required) {
                    throw new Error(message);
                }
                else {
                    console.info(message);
                }
            }
        };
    };
}
exports.Property = Property;
function RequiredProperties(propertiesConstructors) {
    return function (target) {
        var _a, _b;
        return _b = class extends target {
                constructor() {
                    super(...arguments);
                    this[_a] = propertiesConstructors;
                }
            },
            _a = exports.REQUIRED_PROPERTIES,
            _b;
    };
}
exports.RequiredProperties = RequiredProperties;
function OptionalProperties(propertiesConstructors) {
    return function (target) {
        var _a, _b;
        return _b = class extends target {
                constructor() {
                    super(...arguments);
                    this[_a] = propertiesConstructors;
                }
            },
            _a = exports.OPTIONAL_PROPERTIES,
            _b;
    };
}
exports.OptionalProperties = OptionalProperties;
