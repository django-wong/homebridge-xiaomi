import { CharacteristicValue } from "homebridge";
import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class AirPurifier extends AbstractService {
    static urn: string;
    targetAirpurifierState?: CharacteristicValue;
    urn(): string;
    getHbService(): AnyHBService;
    getRequiredProperties(): Property[];
    initialize(): void;
}
