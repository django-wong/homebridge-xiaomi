import AbstractService, { AnyHBService } from "../abstract";
import { Relative_humidity_0000000C } from "../../property/relative_humidity_0000000C";
export declare class Humidity extends AbstractService {
    getHbService(): AnyHBService;
    urn(): string;
    getOptionalProperties(): (typeof Relative_humidity_0000000C)[];
}
