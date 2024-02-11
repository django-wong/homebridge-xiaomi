import AbstractService, { AnyHBService } from "./abstract";
import { Mute_00000040 } from "../property/mute_00000040";
import { Volume_00000013 } from "../property/volume_00000013";
export declare class Speaker extends AbstractService {
    static urn: string;
    getHbService(): AnyHBService;
    getRequiredProperties(): (typeof Mute_00000040 | typeof Volume_00000013)[];
    urn(): string;
}
