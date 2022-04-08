import AbstractService, {Property} from "./abstract";
import {Service} from "homebridge";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";
import {Relative_humidity_0000000C} from "../property/relative_humidity_0000000C";
import {Co2_density_0000004B} from "../property/co2_density_0000004B";

export class Environment extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:environment:0000780A';

    getHbService() {
        return this.hap.Service.TemperatureSensor;
    }

    urn(): string {
        return Environment.urn;
    }

    getOptionalProperties(): Array<Property> {
        return [
            CurrentTemperature_00000020,
            // Relative_humidity_0000000C,
            // Co2_density_0000004B
        ]
    }
}
