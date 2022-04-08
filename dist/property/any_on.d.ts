import AbstractProperty, { AnyHbCharacteristic } from "./abstract";
/**
 * Set the characteristic as ON when on:00000006 was founds and positive in any services
 *
 * @class      AnyOn (name)
 */
export declare class AnyOn extends AbstractProperty<boolean> {
    static urn: string;
    getCharacteristic(): AnyHbCharacteristic;
    urn(): string;
    init(): void;
}
