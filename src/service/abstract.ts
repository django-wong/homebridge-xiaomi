import {API, Nullable, PlatformAccessory, Service as HomeBridgeService} from "homebridge";
import Device from "../device/device";
import InstanceService = MiIOSpec.InstanceService;
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;

import {Serial_number_00000003} from "../property/serial_number_00000003";
import AbstractProperty from "../property/abstract";
import {type} from "os";
import {WithUUID} from "hap-nodejs/dist/types";
import { Device as AccessoryContext } from '../lib/micloud';
import {Name_unknown} from "../property/name_unknown";
import Accessory from "../accessory";
// import {OPTIONAL_PROPERTIES, REQUIRED_PROPERTIES, RequiredProperties} from "../lib/decorator";

// export declare class AnyService extends Service {
//     static readonly UUID: string;
//     constructor(displayName?: string, subtype?: string);
// }

export type AnyHBService = WithUUID<typeof HomeBridgeService>;

export type Property = {
    urn: string
    new (...args: any[]): AbstractProperty
}

type PropertyLike = string | AbstractProperty | Property;

function urn(property: PropertyLike) {
    let propertyUrn = typeof property === 'string' ? property : null;
    if (property instanceof AbstractProperty) {
        propertyUrn = property.urn();
    }
    if (typeof property == 'function') {
        propertyUrn = property.urn;
    }
    if (!propertyUrn) {
        console.error(property);
        throw new Error('invalid urn');
    }
    return propertyUrn;
}

// RequiredProperties
export default abstract class AbstractService {
    // [REQUIRED_PROPERTIES] = [];
    // [OPTIONAL_PROPERTIES] = [];

    properties: AbstractProperty[] = [];

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


    getRequiredProperties(): Array<Property> {
        return [];
    }

    getOptionalProperties(): Array<Property> {
        return [];
    }

    getDynamicProperties(): Array<Property> {
        return [
            Name_unknown
        ];
    }

    init() {
        this.initialize();
        this._initRequiredProperties();
        this._initOptionalProperties();
        this._initDynamicProperties();
    }

    _initDynamicProperties() {
        for (const P of this.getDynamicProperties()) {
            this.addProperty(P);
        }
    }

    addProperty(P: Property, definition?: InstanceProperty) {
        const property = new P(this, definition);
        property.init();
        this.properties.push(property);
    }

    _initRequiredProperties() {
        const properties = this.getRequiredProperties();
        // if (properties.indexOf(Serial_number_00000003) === -1) {
        //     properties.unshift(Serial_number_00000003);
        // }
        for (const P of properties) {
            const definition = this.findProperty(P.urn);
            if (definition) {
                this.addProperty(P, definition);
            } else {
                throw new Error(`Missing required property: ${P.urn}`);
            }
        }
    }

    _initOptionalProperties() {
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
     * @param propertyUrn
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

    private _buildSetPropertyValueOption(propertyUrn: string, value: PrimitiveValue) {
        const property = this.device.findServiceProperty(this.serviceDefinition, propertyUrn)
        if (!property) {
            return undefined;
        }
        return {
            piid: property.iid,
            siid: this.serviceDefinition.iid,
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
        const option = this._buildSetPropertyValueOption(urn(propertyLike), value);
        if (!option) {
            return undefined;
        }
        const res = await this.device.setProperty(option)
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
                const option = this._buildSetPropertyValueOption(
                    urn, urnsValue[urn]
                )
                if (option) options.push(option);
            }
        );

        await this.device.setProperties(options);
    }
}


export type Service = {
    urn: string
    new (...args: any[]): AbstractService
}
