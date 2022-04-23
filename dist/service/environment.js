"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const humidity_1 = require("./environment/humidity");
const temperature_1 = require("./environment/temperature");
class Environment extends abstract_1.default {
    getHbService() {
        throw new Error('This is no matching service of Environment, but it has two sub services: Temperature and Humidity');
        return this.hap.Service.TemperatureSensor;
    }
    urn() {
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
        const services = [humidity_1.Humidity, temperature_1.Temperature].map((Service) => {
            return new Service(this.accessory, this.device, this.api, this.serviceDefinition, this.services);
        });
        this.services.push(...services);
    }
}
exports.Environment = Environment;
Environment.urn = 'urn:miot-spec-v2:service:environment:0000780A';
