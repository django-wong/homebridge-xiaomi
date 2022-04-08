import { Fan_level_00000016 } from "./fan_level_00000016";
export declare class Rotation_speed_00000016 extends Fan_level_00000016 {
    static urn: string;
    init(): void;
    urn(): string;
    percentage2value(percentage: number | null): number;
    value2percentage(value: number | null): number;
}
