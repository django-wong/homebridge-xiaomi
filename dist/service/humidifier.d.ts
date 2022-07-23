import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class Humidifier extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): Array<Property>;
    getDynamicProperties(): Array<Property>;
    getOptionalProperties(): Property[];
}
