import AbstractService, {AnyHBService} from "./abstract";
import {Active_00000006} from "../property/active_00000006";
import {OnAsCurrentHumidifier} from "../property/on_as_current_humidifier";
import {OnAsTargetHumidifierState} from "../property/on_as_target_humidifier_state";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";
import {Nullable, Service} from "homebridge";
import {Humidity} from "./environment/humidity";
import PrimitiveValue = MiIOSpec.PrimitiveValue;
import {Relative_humidity_0000000C} from "../property/relative_humidity_0000000C";
import { Rotation_speed_00000016 } from "../property/rotation_speed_00000016";

class CurrentHumidity extends Relative_humidity_0000000C {
    // @ts-ignore
    async getPropertyValue(defaultValue: any) {
        const service = this.service.getAccessory().ofService(Humidity);
        return service?.getPropertyValue<number>(this, defaultValue);
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

    getRequiredProperties() {
        return [
            Active_00000006,
            OnAsCurrentHumidifier,
            OnAsTargetHumidifierState
        ];
    }

    getDynamicProperties() {
        const propertis = super.getDynamicProperties();
        return [
            ...propertis, CurrentHumidity
        ];
    }

    getOptionalProperties() {
        return [
            Rotation_speed_00000016
        ];
    }
}
