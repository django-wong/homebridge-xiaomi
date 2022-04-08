import AbstractService, { Property } from "./abstract";
import { CharacteristicValue, Nullable } from "homebridge";
export declare function modeToHeatingCoolingState(mode: Nullable<number>): 1 | 2 | 0;
export declare class AirConditioner extends AbstractService {
    urn(): string;
    static urn: string;
    lastKnownState?: number;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Thermostat;
    getRequiredProperties(): Array<Property>;
    initialize(): void;
    _setTargetHeatingCoolingState(value: CharacteristicValue): Promise<void>;
    isOn(): Promise<boolean>;
    _getHeatingCoolingState(): Promise<number>;
    _currentTemperature(): void;
    _temperatureDisplayUnits(): void;
    _heating_threshold_temperature(): void;
    _cooling_threshold_temperature(): void;
}
