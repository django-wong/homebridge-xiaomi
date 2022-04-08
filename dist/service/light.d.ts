import AbstractService, { Property } from "./abstract";
export declare class Light extends AbstractService {
    static urn: string;
    getRequiredProperties(): Array<Property>;
    getOptionalProperties(): Array<Property>;
    urn(): string;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Lightbulb;
    initialize(): void;
}
