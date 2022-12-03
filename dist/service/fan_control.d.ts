import AbstractService, { Property } from "./abstract";
import { Nullable } from "homebridge";
export declare function onToActive(value: Nullable<boolean>): 0 | 1;
export declare function onToFanState(value: Nullable<boolean>): 0 | 2;
export declare function fanLevelToFanState(value: Nullable<number>): 0 | 1;
export declare class FanControl extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Fanv2;
    getOptionalProperties(): Array<Property>;
    getDynamicProperties(): Property[];
}
