import AbstractService, { AnyHBService } from "./abstract";
import { On_00000006 } from "../property/on_00000006";
export declare class Heater extends AbstractService {
    getHbService(): AnyHBService;
    static urn: string;
    /**
     * Heater can act as thermostat if it can set target temperature
     */
    get canActAsThermostat(): boolean;
    urn(): string;
    getRequiredProperties(): (typeof On_00000006)[];
    initialize(): void;
    /**
     * Current and target state can be only HEAT or OFF
     */
    initHeatingCoolingState(): void;
    initTemperature(): void;
}
