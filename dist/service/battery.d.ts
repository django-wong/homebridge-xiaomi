import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class Battery extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): Property[];
}
