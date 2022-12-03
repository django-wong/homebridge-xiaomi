import AbstractService, { AnyHBService, Property } from "./abstract";
export declare class Heater extends AbstractService {
    getHbService(): AnyHBService;
    static urn: string;
    /**
     * Heater can act as thermostat if it can set target temperature
     */
    get canActAsThermostat(): boolean;
    urn(): string;
    getRequiredProperties(): Array<Property>;
    initialize(): void;
    /**
     * Current and target state can be only HEAT or OFF
     */
    initHeatingCoolingState(): void;
    initTemperature(): void;
}
