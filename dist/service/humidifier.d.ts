import AbstractService, { AnyHBService } from "./abstract";
import { OnAsCurrentHumidifier } from "../property/on_as_current_humidifier";
import { Rotation_speed_00000016 } from "../property/rotation_speed_00000016";
export declare class Humidifier extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): (typeof OnAsCurrentHumidifier)[];
    getDynamicProperties(): typeof import("../property/abstract").Property[];
    getOptionalProperties(): (typeof Rotation_speed_00000016)[];
}
