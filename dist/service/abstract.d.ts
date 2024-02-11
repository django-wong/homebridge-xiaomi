import { API, Nullable, PlatformAccessory, Service as HomeBridgeService } from "homebridge";
import Device from "../device/device";
import InstanceService = MiIOSpec.InstanceService;
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import InstanceProperty = MiIOSpec.InstanceProperty;
import AbstractProperty, { Property } from "../property/abstract";
import { WithUUID } from "hap-nodejs/dist/types";
import { Device as AccessoryContext } from '../lib/micloud';
import Accessory from "../accessory";
export type AnyHBService = WithUUID<typeof HomeBridgeService>;
type PropertyLike = string | AbstractProperty | typeof AbstractProperty;
export default abstract class AbstractService {
    protected accessory: Accessory;
    protected device: Device;
    protected api: API;
    protected serviceDefinition: InstanceService;
    protected services: AbstractService[];
    properties: Property<any>[];
    constructor(accessory: Accessory, device: Device, api: API, serviceDefinition: InstanceService, services: AbstractService[]);
    abstract urn(): string;
    getDevice(): Device;
    getAccessory(): Accessory;
    getPlatformAccessory(): PlatformAccessory<AccessoryContext>;
    getRequiredProperties(): Array<typeof AbstractProperty>;
    getOptionalProperties(): Array<typeof AbstractProperty>;
    getDynamicProperties(): Array<typeof Property>;
    init(): void;
    private initDynamicProperties;
    addProperty(P: any, definition?: InstanceProperty): void;
    private initRequiredProperties;
    private initOptionalProperties;
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
     * @param propertyLike
     * @param defaultValue
     */
    getPropertyValue<T = PrimitiveValue>(propertyLike: PropertyLike, defaultValue?: Nullable<T>): Promise<Nullable<T>>;
    private buildSetPropertyValueOption;
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
export type Service = {
    urn: string;
    new (...args: any[]): AbstractService;
};
export {};
