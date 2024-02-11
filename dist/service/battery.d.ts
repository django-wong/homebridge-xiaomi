import AbstractService, { AnyHBService } from "./abstract";
import { Battery_level_low_00000014 } from "../property/battery_level_low_00000014";
export declare class Battery extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): (typeof Battery_level_low_00000014)[];
}
