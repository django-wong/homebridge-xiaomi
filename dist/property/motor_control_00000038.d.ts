import AbstractProperty from "./abstract";
import { Service, Characteristic } from "homebridge";
export declare class Motor_control_00000038 extends AbstractProperty {
    static urn: string;
    switches: [Service, Characteristic][];
    urn(): string;
    init(): void;
    createService(item: MiIOSpec.PossibleValue): void;
    private resetExcept;
}
