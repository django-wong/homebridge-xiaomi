import { AnyHbCharacteristic } from "./abstract";
import { AnyOn } from "./any_on";
/**
 * Set current characteristic as ACTIVE if on:00000006 was found in any services
 *
 * @class      AnyActive (name)
 */
export declare class AnyActive extends AnyOn {
    getCharacteristic(): AnyHbCharacteristic;
}
