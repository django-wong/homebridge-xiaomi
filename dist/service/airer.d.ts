import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class Airer extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getDynamicProperties(): Array<Property>;
    getRequiredProperties(): Array<Property>;
}
