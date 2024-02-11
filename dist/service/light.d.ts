import AbstractService from "./abstract";
import { On_00000006 } from "../property/on_00000006";
import { Brightness_0000000D } from "../property/brightness_0000000D";
import { Color_temperature_0000000F } from "../property/color_temperature_0000000F";
export declare class Light extends AbstractService {
    static urn: string;
    getRequiredProperties(): (typeof On_00000006)[];
    getOptionalProperties(): (typeof Brightness_0000000D | typeof Color_temperature_0000000F)[];
    urn(): string;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Lightbulb;
    initialize(): void;
}
