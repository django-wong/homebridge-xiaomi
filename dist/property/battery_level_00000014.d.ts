import { AnyHbCharacteristic } from './abstract';
import { Readonly } from './lib/readonly';
import { Characteristic } from 'homebridge';
export declare class Battery_level_00000014 extends Readonly<number> {
    static urn: string;
    batter_level: number;
    status_low_battery?: Characteristic;
    urn(): string;
    getCharacteristic(): AnyHbCharacteristic;
    get isBatteryLow(): boolean;
    init(): void;
    in(value: Nullable<number>): Nullable<number>;
}
