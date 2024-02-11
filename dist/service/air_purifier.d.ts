import { CharacteristicValue } from "homebridge";
import { Active_00000006 } from "../property/active_00000006";
import AbstractService, { AnyHBService } from "./abstract";
export declare class AirPurifier extends AbstractService {
    static urn: string;
    targetAirpurifierState?: CharacteristicValue;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): (typeof Active_00000006)[];
    initialize(): void;
}
