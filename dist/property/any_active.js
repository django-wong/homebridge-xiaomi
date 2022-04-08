"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyActive = void 0;
const any_on_1 = require("./any_on");
/**
 * Set current characteristic as ACTIVE if on:00000006 was found in any services
 *
 * @class      AnyActive (name)
 */
class AnyActive extends any_on_1.AnyOn {
    getCharacteristic() {
        return this.Characteristic.Active;
    }
}
exports.AnyActive = AnyActive;
