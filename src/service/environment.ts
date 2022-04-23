import AbstractService, {Property} from "./abstract";
import {Service} from "homebridge";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";
import {Relative_humidity_0000000C} from "../property/relative_humidity_0000000C";
import {Co2_density_0000004B} from "../property/co2_density_0000004B";
import {Humidity} from "./environment/humidity";
import {Temperature} from "./environment/temperature";

export class Environment extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:environment:0000780A';

    getHbService() {
        throw new Error('This is no matching service of Environment, but it has two sub services: Temperature and Humidity');
        return this.hap.Service.TemperatureSensor;
    }

    urn(): string {
        return Environment.urn;
    }

    getDynamicProperties() {
        return [];
    }

    // getOptionalProperties(): Array<Property> {
    //     return [
    //         CurrentTemperature_00000020,
    //         Relative_humidity_0000000C,
    //         // Co2_density_0000004B
    //     ]
    // }

    initialize() {
        const services = [Humidity, Temperature].map(
            (Service) => {
                return new Service(this.accessory, this.device, this.api, this.serviceDefinition, this.services);
            }
        );

        this.services.push(...services);
    }
}
