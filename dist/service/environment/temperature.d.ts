import AbstractService, { AnyHBService, Property } from "../abstract";
export declare class Temperature extends AbstractService {
    getHbService(): AnyHBService;
    urn(): string;
    getOptionalProperties(): Array<Property>;
}
