import {API, Nullable, PlatformAccessory, Service as HomeBridgeService} from "homebridge";
import Device from "../device/device";
import InstanceService = MiIOSpec.InstanceService;
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;

import {Serial_number_00000003} from "../property/serial_number_00000003";
import AbstractProperty, {
    DynamicProperty,
    Property
} from "../property/abstract";
import {type} from "os";
import {WithUUID} from "hap-nodejs/dist/types";
import { Device as AccessoryContext } from '../lib/micloud';
import {Name_unknown} from "../property/name_unknown";
import Accessory from "../accessory";
import {throws} from "node:assert";
// import {OPTIONAL_PROPERTIES, REQUIRED_PROPERTIES, RequiredProperties} from "../lib/decorator";

// export declare class AnyService extends Service {
//     static readonly UUID: string;
//     constructor(displayName?: string, subtype?: string);
// }

export type AnyHBService = WithUUID<typeof HomeBridgeService>;

// export type Property = {
//     urn: string
//     new (...args: any[]): DynamicProperty
// }

type PropertyLike = string | AbstractProperty | typeof AbstractProperty;

function urn(property: PropertyLike) {
    let propertyUrn = typeof property === 'string' ? property : null;


    if (!propertyUrn && property instanceof AbstractProperty) {
        propertyUrn = property.urn();
    }

    if (!propertyUrn && (property as any).urn) {
        propertyUrn = (property as any).urn;
    }

    if (!propertyUrn) {
        throw new Error('Invalid property, expected string or AbstractProperty instance or constructor.');
    }

    return propertyUrn;
}

// RequiredProperties
export default abstract class AbstractService {
    // [REQUIRED_PROPERTIES] = [];
    // [OPTIONAL_PROPERTIES] = [];

    properties: Property<any>[] = [];

    constructor(
        // protected accessory: PlatformAccessory<AccessoryContext>,
        protected accessory: Accessory,
        protected device: Device,
        protected api: API,
        protected serviceDefinition: InstanceService,
        protected services: AbstractService[]
    ) {
        this.init();
    }

    abstract urn(): string;

    getDevice() {
        return this.device;
    }

    getAccessory() {
        return this.accessory;
    }

    getPlatformAccessory() {
        return this.accessory.getPlatformAccessory();
    }


    getRequiredProperties(): Array<typeof AbstractProperty> {
        return [];
    }

    getOptionalProperties(): Array<typeof AbstractProperty> {
        return [];
    }

    getDynamicProperties(): Array<typeof Property> {
        return [
            Name_unknown
        ];
    }

    init() {
        this.initialize();
        this.initRequiredProperties();
        this.initOptionalProperties();
        this.initDynamicProperties();
    }

    private initDynamicProperties() {
        for (const P of this.getDynamicProperties()) {
            this.addProperty(P);
        }
    }

    addProperty(P: any, definition?: InstanceProperty) {
        const property = new P(this, definition);
        property.init();
        this.properties.push(property);
    }

    private initRequiredProperties() {
        const properties = this.getRequiredProperties();
        for (const P of properties) {
            const definition = this.findProperty(P.urn);
            if (definition) {
                this.addProperty(P, definition);
            } else {
                throw new Error(`Missing required property: ${P.urn}`);
            }
        }
    }

    private initOptionalProperties() {
        const properties = this.getOptionalProperties();
        for (const P of properties) {
            const definition = this.findProperty(P.urn);
            if (definition) {
                this.addProperty(P, definition);
            } else {
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

    abstract getHbService(): AnyHBService;

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
            service = this.getPlatformAccessory().addService(
                this.getHbService(), this.hbServiceName, this.subType
            );
        }
        return service;
    }

    /**
     * Alias to getService();
     */
    get service() {
        return this.getService();
    }

    initialize(): void {

    };

    hasProperty(propertyUrn: string) {
        return !!this.findProperty(propertyUrn);
    }

    findProperty(propertyUrn: string) {
        return this.device.findServiceProperty(this.serviceDefinition, propertyUrn);
    }

    /**
     * Get property value by URN
     * @param propertyLike
     * @param defaultValue
     */
    async getPropertyValue<T = PrimitiveValue>(propertyLike: PropertyLike, defaultValue: Nullable<T> = null): Promise<Nullable<T>> {
        let value = null;

        const property = this.device.findServiceProperty(this.serviceDefinition, urn(propertyLike))
        if (!property) {
            value = defaultValue;
        } else {
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

    private buildSetPropertyValueOption(propertyUrn: string, value: PrimitiveValue) {
        const property = this.device.findServiceProperty(this.serviceDefinition, propertyUrn)

        if (! property) {
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
    async setPropertyValue(propertyLike: PropertyLike, value: PrimitiveValue): Promise<void> {
        console.info(`[Set] ${urn(propertyLike)} >> ${value}`);
        const res = await this.device.setProperty(
            this.buildSetPropertyValueOption(urn(propertyLike), value)
        )
        return res[0].value;
    }

    /**
     * Set two or more properties value at once
     * @param urnsValue
     */
    async setPropertiesValue(urnsValue: {[key: string]: PrimitiveValue}) {
        const options: SetPropertyOption[] = [];

        Object.keys(urnsValue).forEach(
            (urn) => {
                const option = this.buildSetPropertyValueOption(
                    urn, urnsValue[urn]
                )
                options.push(option);
            }
        );

        await this.device.setProperties(options);
    }
}


export type Service = {
    urn: string
    new (...args: any[]): AbstractService
}
