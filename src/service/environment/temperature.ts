import AbstractService, {AnyHBService} from "../abstract";
import {CurrentTemperature_00000020} from "../../property/current_temperature_00000020";

export class Temperature extends AbstractService {
    getHbService(): AnyHBService {
        return this.hap.Service.TemperatureSensor;
    }

    urn(): string {
        return "";
    }

    getOptionalProperties() {
        return [
            CurrentTemperature_00000020
        ]
    }
}
