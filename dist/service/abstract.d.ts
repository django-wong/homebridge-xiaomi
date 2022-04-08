import { API, Nullable, PlatformAccessory, Service as HomeBridgeService } from "homebridge";
import Device from "../device/device";
import InstanceService = MiIOSpec.InstanceService;
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;
import AbstractProperty from "../property/abstract";
import { WithUUID } from "hap-nodejs/dist/types";
import { Device as AccessoryContext } from '../lib/micloud';
import Accessory from "../accessory";
export declare type AnyHBService = WithUUID<typeof HomeBridgeService>;
export declare type Property = {
    urn: string;
    new (...args: any[]): AbstractProperty;
};
declare type PropertyLike = string | AbstractProperty | Property;
export default abstract class AbstractService {
    protected accessory: Accessory;
    protected device: Device;
    protected api: API;
    protected serviceDefinition: InstanceService;
    protected services: AbstractService[];
    properties: AbstractProperty[];
    constructor(accessory: Accessory, device: Device, api: API, serviceDefinition: InstanceService, services: AbstractService[]);
    abstract urn(): string;
    getAccessory(): Accessory;
    getPlatformAccessory(): PlatformAccessory<AccessoryContext>;
    getRequiredProperties(): Array<Property>;
    getOptionalProperties(): Array<Property>;
    getDynamicProperties(): Array<Property>;
    init(): void;
    _initDynamicProperties(): void;
    addProperty(P: Property, definition?: InstanceProperty): void;
    _initRequiredProperties(): void;
    _initOptionalProperties(): void;
    get hap(): typeof import("hap-nodejs");
    get hbServiceName(): string;
    abstract getHbService(): AnyHBService;
    get siid(): 3;
    getServiceDefinition(): InstanceService;
    get subType(): string;
    getService(): HomeBridgeService;
    /**
     * Alias to getService();
     */
    get service(): HomeBridgeService;
    initialize(): void;
    hasProperty(propertyUrn: string): boolean;
    findProperty(propertyUrn: string): InstanceProperty | undefined;
    /**
     * Get property value by URN
     * @param propertyUrn
     * @param defaultValue
     */
    getPropertyValue<T = PrimitiveValue>(propertyLike: PropertyLike, defaultValue?: Nullable<T>): Promise<Nullable<T>>;
    private _buildSetPropertyValueOption;
    /**
     * Set property value by property URN
     * @param propertyLike
     * @param value
     */
    setPropertyValue(propertyLike: PropertyLike, value: PrimitiveValue): Promise<void>;
    /**
     * Set two or more properties value at once
     * @param urnsValue
     */
    setPropertiesValue(urnsValue: {
        [key: string]: PrimitiveValue;
    }): Promise<void>;
}
export declare type Service = {
    urn: string;
    new (...args: any[]): AbstractService;
};
export {};
