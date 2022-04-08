import AbstractService, { Property } from './abstract';
export declare class DeviceInformation extends AbstractService {
    static urn: string;
    urn(): string;
    getRequiredProperties(): Array<Property>;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").AccessoryInformation;
    getService(): import("hap-nodejs").Service;
    initialize(): void;
    _identify(): void;
    _name(): void;
}
