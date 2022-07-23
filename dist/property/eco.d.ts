import { Service } from "homebridge";
import { AnyHbCharacteristic } from "./abstract";
import { ReadWrite } from "./lib/read_write";
export declare class ECO extends ReadWrite<boolean> {
    static urn: string;
    urn(): string;
    getCharacteristic(): AnyHbCharacteristic;
    platformService?: Service;
    getService(): Service;
}
