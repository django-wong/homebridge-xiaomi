import AbstractService from "./abstract";
export declare class Environment extends AbstractService {
    static urn: string;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").TemperatureSensor;
    urn(): string;
    getDynamicProperties(): never[];
    initialize(): void;
}
