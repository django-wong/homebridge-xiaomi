import AbstractProperty from "./abstract";
export declare class Color_temperature_0000000F extends AbstractProperty<number> {
    static urn: string;
    init(): void;
    urn(): string;
    kelvin2temperature(kelvin: number): number;
    temperature2kelvin(temperature: number): number;
}
