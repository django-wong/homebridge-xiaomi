import AbstractService from "./abstract";
import { Nullable } from "homebridge";
import { Name_unknown } from "../property/name_unknown";
export declare function onToActive(value: Nullable<boolean>): 1 | 0;
export declare function onToFanState(value: Nullable<boolean>): 2 | 0;
export declare function fanLevelToFanState(value: Nullable<number>): 1 | 0;
export declare class Fan extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): typeof import("hap-nodejs/dist/lib/definitions").Fanv2;
    getOptionalProperties(): never[];
    getDynamicProperties(): (typeof Name_unknown)[];
}
