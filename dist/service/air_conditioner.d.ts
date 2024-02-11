import AbstractService from "./abstract";
import { Nullable } from "homebridge";
import { Target_temperature_00000021 } from "../property/target_temperature_00000021";
import { ECO } from "../property/eco";
export declare function modeToHeatingCoolingState(mode: Nullable<number>): 1 | 2 | 0;
export declare class AirConditioner extends AbstractService {
    urn(): string;
    static urn: string;
    lastKnownState?: number;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Thermostat;
    getRequiredProperties(): (typeof Target_temperature_00000021)[];
    getOptionalProperties(): (typeof ECO)[];
    initialize(): void;
    isOn(): Promise<boolean>;
    _currentTemperature(): void;
    _temperatureDisplayUnits(): void;
}
