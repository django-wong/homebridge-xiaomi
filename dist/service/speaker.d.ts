import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class Speaker extends AbstractService {
    static urn: string;
    getHbService(): AnyHBService;
    getRequiredProperties(): Array<Property>;
    urn(): string;
}
