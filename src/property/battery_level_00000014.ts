import AbstractProperty, { AnyHbCharacteristic } from './abstract';
import { Readonly } from './lib/readonly';
import { Characteristic } from 'homebridge';


export class Battery_level_00000014 extends Readonly<number> {
	static urn = 'urn:miot-spec-v2:property:battery-level:00000014';

	batter_level = 100;

	status_low_battery?: Characteristic;

	urn(): string {
	    return Battery_level_00000014.urn;
	}

	getCharacteristic(): AnyHbCharacteristic {
	    return this.Characteristic.BatteryLevel;
	}

	get isBatteryLow() {
		return this.batter_level < 30;
	}

	init(): void {
	    super.init();
	    this.status_low_battery = this.getService().getCharacteristic(this.Characteristic.StatusLowBattery);

	    this.status_low_battery.onGet(
	    	() => {
	    		return this.isBatteryLow;
	    	}
	    )
	}

    in(value: Nullable<number>): Nullable<number> {
        if (value) {
        	this.batter_level = value;
        	this.status_low_battery?.setValue(this.isBatteryLow);
        }
        return value;
    }
}
