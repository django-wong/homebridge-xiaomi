import AbstractService from "./abstract";
import { Nullable } from "homebridge";
import { Rotation_speed_00000016 } from "../property/rotation_speed_00000016";
import { Vertical_swing_00000018 } from "../property/vertical_swing_00000018";
import { Horizontal_swing_00000018 } from "../property/horizontal_swing_00000018";
import { Name_unknown } from "../property/name_unknown";
import { AnyActive } from "../property/any_active";
import {HorizontalOrVerticalSwing} from "../property/horizontal_or_vertical_swing";
import { Fan_level_00000016 } from "../property/fan_level_00000016";
import { On_00000006 } from "../property/on_00000006";

export function onToActive(value: Nullable<boolean>) {
    return value ? 1 : 0;
}

export function onToFanState(value: Nullable<boolean>) {
	return value ? 2 : 0;
}

export function fanLevelToFanState(value: Nullable<number>) {
	return value == 0 ? 0 : 1;
}


export class Fan extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:fan:00007808';

	urn(): string {
		return Fan.urn;
	}

	getHbService() {
        return this.hap.Service.Fanv2;
    }

	getOptionalProperties() {
		return [
			
		];
	}

    getDynamicProperties() {
        return [
            Name_unknown,
			On_00000006,
			Fan_level_00000016
        ];
    }
}
