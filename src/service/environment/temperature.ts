import AbstractService, {AnyHBService, Property} from "../abstract";
import {CurrentTemperature_00000020} from "../../property/current_temperature_00000020";

export class Temperature extends AbstractService {
    getHbService(): AnyHBService {
        return this.hap.Service.TemperatureSensor;
    }

    urn(): string {
        return "";
    }

    getOptionalProperties(): Array<Property> {
        return [
            CurrentTemperature_00000020
        ]
    }
}
