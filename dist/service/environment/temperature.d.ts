import AbstractService, { AnyHBService } from "../abstract";
import { CurrentTemperature_00000020 } from "../../property/current_temperature_00000020";
export declare class Temperature extends AbstractService {
    getHbService(): AnyHBService;
    urn(): string;
    getOptionalProperties(): (typeof CurrentTemperature_00000020)[];
}
