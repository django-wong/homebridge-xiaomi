"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicProperty = exports.Property = void 0;
class Property {
    constructor(service, ...args) {
        this.service = service;
    }
    get Characteristic() {
        return this.service.hap.Characteristic;
    }
    getService() {
        return this.service.getService();
    }
}
exports.Property = Property;
class DynamicProperty extends Property {
}
exports.DynamicProperty = DynamicProperty;
class AbstractProperty extends DynamicProperty {
    constructor(service, propertyDefinition) {
        super(service);
        this.service = service;
        this.propertyDefinition = propertyDefinition;
    }
    get Characteristic() {
        return this.service.hap.Characteristic;
    }
    getService() {
        return this.service.getService();
    }
    getPropertyValue(defaultValue = null) {
        return this.service.getPropertyValue(this.urn(), defaultValue);
    }
    setPropertyValue(value) {
        return this.service.setPropertyValue(this.urn(), value);
    }
    getPropertyDefinition() {
        return this.propertyDefinition;
    }
}
exports.default = AbstractProperty;
