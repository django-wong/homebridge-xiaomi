import AbstractService, {AnyHBService, Property} from "./abstract";
import {Active_00000006} from "../property/active_00000006";
import {CurrentHumidifierDehumidifierOn} from "../property/current_humidifier_dehumidifier_on";
import {Target_humidifier_dehumidifier_state_on} from "../property/target_humidifier_dehumidifier_state_on";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";
import {Service} from "homebridge";
import {Humidity} from "./environment/humidity";
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import {Relative_humidity_0000000C} from "../property/relative_humidity_0000000C";
import { Rotation_speed_00000016 } from "../property/rotation_speed_00000016";

class CurrentHumidity extends Relative_humidity_0000000C {
    async getPropertyValue(defaultValue: Nullable<number> = null): Promise<Nullable<number>> {
        const service = this.service.getAccessory().ofService(Humidity);
        if (service) {
            return service.getPropertyValue<number>(this, defaultValue);
        }
        return null;
    }
}

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

    getDynamicProperties(): Array<Property> {
        const propertis = super.getDynamicProperties();
        return [...propertis, CurrentHumidity];
    }

    getOptionalProperties(): Property[] {
        return [
            Rotation_speed_00000016
        ];
    }
}
