import AbstractService from './abstract';
import { Manufacturer_00000001 } from "../property/manufacturer_00000001";
export declare class DeviceInformation extends AbstractService {
    static urn: string;
    urn(): string;
    getRequiredProperties(): (typeof Manufacturer_00000001)[];
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").AccessoryInformation;
    getService(): import("hap-nodejs").Service;
    initialize(): void;
    _identify(): void;
    _name(): void;
}
