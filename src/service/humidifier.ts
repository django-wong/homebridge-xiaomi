import AbstractService, {AnyHBService, Property} from "./abstract";
import {On_00000006} from "../property/on_00000006";
import {Fan_level_00000016} from "../property/fan_level_00000016";
import {Active_00000006} from "../property/active_00000006";
import {CurrentHumidifierDehumidifierOn} from "../property/current_humidifier_dehumidifier_on";
import {Target_humidifier_dehumidifier_state_on} from "../property/target_humidifier_dehumidifier_state_on";

export class Humidifier extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:humidifier:00007818';

    urn(): string {
        return Humidifier.urn;
    }

    getHbService(): AnyHBService {
        return this.hap.Service.HumidifierDehumidifier;
    }

    getRequiredProperties(): Array<Property> {
        return [
            Active_00000006,
            CurrentHumidifierDehumidifierOn,
            Target_humidifier_dehumidifier_state_on
        ];
    }
}
