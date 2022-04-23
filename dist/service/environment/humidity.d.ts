import AbstractService, { AnyHBService, Property } from "../abstract";
export declare class Humidity extends AbstractService {
    getHbService(): AnyHBService;
    urn(): string;
    getOptionalProperties(): Array<Property>;
}
