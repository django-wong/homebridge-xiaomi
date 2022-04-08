"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battery_level_00000014 = void 0;
const readonly_1 = require("./lib/readonly");
class Battery_level_00000014 extends readonly_1.Readonly {
    constructor() {
        super(...arguments);
        this.batter_level = 100;
    }
    urn() {
        return Battery_level_00000014.urn;
    }
    getCharacteristic() {
        return this.Characteristic.BatteryLevel;
    }
    get isBatteryLow() {
        return this.batter_level < 30;
    }
    init() {
        super.init();
        this.status_low_battery = this.getService().getCharacteristic(this.Characteristic.StatusLowBattery);
        this.status_low_battery.onGet(() => {
            return this.isBatteryLow;
        });
    }
    in(value) {
        var _a;
        if (value) {
            this.batter_level = value;
            (_a = this.status_low_battery) === null || _a === void 0 ? void 0 : _a.setValue(this.isBatteryLow);
        }
        return value;
    }
}
exports.Battery_level_00000014 = Battery_level_00000014;
Battery_level_00000014.urn = 'urn:miot-spec-v2:property:battery-level:00000014';
