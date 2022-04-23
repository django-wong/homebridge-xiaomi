import { Battery_level_00000014 } from "../property/battery_level_00000014";
import AbstractService, { AnyHBService, Property } from "./abstract";
import {Battery_level_low_00000014} from "../property/battery_level_low_00000014";

export class Battery extends AbstractService {
	static urn = 'urn:miot-spec-v2:service:battery:00007805';

    urn(): string {
        return Battery.urn;
    }

    getHbService(): AnyHBService {
        return this.hap.Service.Battery;
    }

    getRequiredProperties(): Property[] {
        return [
            Battery_level_low_00000014,
            Battery_level_00000014
        ]
    }
}
