"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicProperty = void 0;
class DynamicProperty {
    constructor(service) {
        this.service = service;
    }
    get Characteristic() {
        return this.service.hap.Characteristic;
    }
}
exports.DynamicProperty = DynamicProperty;
class AbstractProperty {
    constructor(service, propertyDefinition) {
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
