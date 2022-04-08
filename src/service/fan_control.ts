import AbstractService, {Property} from "./abstract";
import {Nullable, Service} from "homebridge";
import { debounce } from 'debounce';
import {Rotation_speed_00000016} from "../property/rotation_speed_00000016";
import {Vertical_swing_00000018} from "../property/vertical_swing_00000018";
import {Horizontal_swing_00000018} from "../property/horizontal_swing_00000018";
import { Name_unknown } from "../property/name_unknown";
import { AnyActive } from "../property/any_active";

export function onToActive(value: Nullable<boolean>) {
    return value ? 1 : 0;
}

export function onToFanState(value: Nullable<boolean>) {
	return value ? 2 : 0;
}

export function fanLevelToFanState(value: Nullable<number>) {
	return value == 0 ? 0 : 1;
}


export class FanControl extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:fan-control:00007809';

	urn(): string {
		return FanControl.urn;
	}

	getHbService() {
        return this.hap.Service.Fanv2;
    }

	getOptionalProperties(): Array<Property> {
		return [
			Rotation_speed_00000016,
			Vertical_swing_00000018,
			Horizontal_swing_00000018
		];
	}

    getDynamicProperties(): Property[] {
        return [
            Name_unknown,
            AnyActive,
        ];
    }
}
