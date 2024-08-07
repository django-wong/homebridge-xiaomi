"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = __importDefault(require("../property/abstract"));
const name_unknown_1 = require("../property/name_unknown");
function urn(property) {
    let propertyUrn = typeof property === 'string' ? property : null;
    if (!propertyUrn && property instanceof abstract_1.default) {
        propertyUrn = property.urn();
    }
    if (!propertyUrn && property.urn) {
        propertyUrn = property.urn;
    }
    if (!propertyUrn) {
        throw new Error('Invalid property, expected string or AbstractProperty instance or constructor.');
    }
    return propertyUrn;
}
// RequiredProperties
class AbstractService {
    constructor(
    // protected accessory: PlatformAccessory<AccessoryContext>,
    accessory, device, api, serviceDefinition, services) {
        this.accessory = accessory;
        this.device = device;
        this.api = api;
        this.serviceDefinition = serviceDefinition;
        this.services = services;
        // [REQUIRED_PROPERTIES] = [];
        // [OPTIONAL_PROPERTIES] = [];
        this.properties = [];
        this.init();
    }
    getDevice() {
        return this.device;
    }
    getAccessory() {
        return this.accessory;
    }
    getPlatformAccessory() {
        return this.accessory.getPlatformAccessory();
    }
    getRequiredProperties() {
        return [];
    }
    getOptionalProperties() {
        return [];
    }
    getDynamicProperties() {
        return [
            name_unknown_1.Name_unknown
        ];
    }
    init() {
        this.initialize();
        this.initRequiredProperties();
        this.initOptionalProperties();
        this.initDynamicProperties();
    }
    initDynamicProperties() {
        for (const P of this.getDynamicProperties()) {
            this.addProperty(P);
        }
    }
    addProperty(P, definition) {
        const property = new P(this, definition);
        property.init();
        this.properties.push(property);
    }
    initRequiredProperties() {
        const properties = this.getRequiredProperties();
        for (const P of properties) {
            const definition = this.findProperty(P.urn);
            if (definition) {
                this.addProperty(P, definition);
            }
            else {
                throw new Error(`Missing required property: ${P.urn}`);
            }
        }
    }
    initOptionalProperties() {
        const properties = this.getOptionalProperties();
        for (const P of properties) {
            const definition = this.findProperty(P.urn);
            if (definition) {
                this.addProperty(P, definition);
            }
            else {
                console.debug(`Missing optional property: ${P.urn}`);
            }
        }
    }
    get hap() {
        return this.api.hap;
    }
    get hbServiceName() {
        // return `${this.serviceDefinition?.type}:${this.serviceDefinition?.iid}`;
        return this.serviceDefinition.description || 'No Name';
    }
    get siid() {
        return this.serviceDefinition.iid;
    }
    getServiceDefinition() {
        return this.serviceDefinition;
    }
    get subType() {
        return this.siid.toString();
    }
    // The hap service.
    getService() {
        let service = this.getPlatformAccessory().getServiceById(this.getHbService(), this.subType);
        if (!service) {
            service = this.getPlatformAccessory().addService(this.getHbService(), this.hbServiceName, this.subType);
        }
        return service;
    }
    /**
     * Alias to getService();
     */
    get service() {
        return this.getService();
    }
    initialize() {
    }
    ;
    hasProperty(propertyUrn) {
        return !!this.findProperty(propertyUrn);
    }
    findProperty(propertyUrn) {
        return this.device.findServiceProperty(this.serviceDefinition, propertyUrn);
    }
    /**
     * Get property value by URN
     * @param propertyLike
     * @param defaultValue
     */
    async getPropertyValue(propertyLike, defaultValue = null) {
        let value = null;
        const property = this.device.findServiceProperty(this.serviceDefinition, urn(propertyLike));
        if (!property) {
            value = defaultValue;
        }
        else {
            const option = {
                piid: property.iid,
                siid: this.serviceDefinition.iid,
            };
            const res = await this.device.getProperty(option);
            value = res[0].value;
        }
        console.info(`[Get] ${urn(propertyLike)} >> ${value}`);
        return value;
    }
    buildSetPropertyValueOption(propertyUrn, value) {
        const property = this.device.findServiceProperty(this.serviceDefinition, propertyUrn);
        if (!property) {
            throw new Error(`Property not found: ${propertyUrn}`);
        }
        return {
            siid: this.serviceDefinition.iid,
            piid: property.iid,
            value: value
        };
    }
    /**
     * Set property value by property URN
     * @param propertyLike
     * @param value
     */
    async setPropertyValue(propertyLike, value) {
        console.info(`[Set] ${urn(propertyLike)} >> ${value}`);
        const res = await this.device.setProperty(this.buildSetPropertyValueOption(urn(propertyLike), value));
        return res[0].value;
    }
    /**
     * Set two or more properties value at once
     * @param urnsValue
     */
    async setPropertiesValue(urnsValue) {
        const options = [];
        Object.keys(urnsValue).forEach((urn) => {
            const option = this.buildSetPropertyValueOption(urn, urnsValue[urn]);
            options.push(option);
        });
        await this.device.setProperties(options);
    }
}
exports.default = AbstractService;
