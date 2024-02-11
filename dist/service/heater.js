"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heater = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const on_00000006_1 = require("../property/on_00000006");
const environment_1 = require("./environment");
const current_temperature_00000020_1 = require("../property/current_temperature_00000020");
class Heater extends abstract_1.default {
    getHbService() {
        return this.canActAsThermostat ? this.api.hap.Service.Thermostat : this.api.hap.Service.Switch;
    }
    /**
     * Heater can act as thermostat if it can set target temperature
     */
    get canActAsThermostat() {
        return this.hasProperty('urn:miot-spec-v2:property:target-temperature:00000021');
    }
    urn() {
        return Heater.urn;
    }
    getRequiredProperties() {
        return this.canActAsThermostat ? [] : [
            on_00000006_1.On_00000006,
        ];
    }
    initialize() {
        if (this.canActAsThermostat) {
            this.initTemperature();
            this.initHeatingCoolingState();
        }
    }
    /**
     * Current and target state can be only HEAT or OFF
     */
    initHeatingCoolingState() {
        this.getService().getCharacteristic(this.api.hap.Characteristic.TargetHeatingCoolingState).onSet(async () => {
            const value = await this.getPropertyValue(on_00000006_1.On_00000006);
            return value
                ? this.api.hap.Characteristic.CurrentHeatingCoolingState.HEAT
                : this.api.hap.Characteristic.CurrentHeatingCoolingState.OFF;
        }).onSet(async (value) => {
            await this.setPropertyValue(on_00000006_1.On_00000006, !!value);
        }).setProps({
            minValue: this.hap.Characteristic.TargetHeatingCoolingState.OFF,
            maxValue: this.hap.Characteristic.TargetHeatingCoolingState.HEAT,
            minStep: 1,
            validValues: [
                this.hap.Characteristic.TargetHeatingCoolingState.OFF,
                this.hap.Characteristic.TargetHeatingCoolingState.HEAT
            ]
        });
    }
    initTemperature() {
        const property = this.findProperty('urn:miot-spec-v2:property:target-temperature:00000021');
        if (!property) {
            return;
        }
        let minValue = 10;
        let maxValue = 38;
        let step = 1;
        if (property['value-range']) {
            minValue = property['value-range'][0];
            maxValue = property['value-range'][1];
            step = property['value-range'][2];
        }
        this.getService().getCharacteristic(this.api.hap.Characteristic.CurrentTemperature).onGet(async () => {
            // Read from environment service
            const environment = this.accessory.getService(environment_1.Environment);
            if (environment) {
                return environment.getPropertyValue(current_temperature_00000020_1.CurrentTemperature_00000020);
            }
            return await this.getPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021');
        });
        this.getService().getCharacteristic(this.api.hap.Characteristic.TargetTemperature).onGet(async () => {
            return await this.getPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021');
        }).onSet(async (value) => {
            await this.setPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021', value);
        }).setProps({
            minValue: minValue,
            maxValue: maxValue, minStep: step, unit: 'celsius'
        });
    }
}
exports.Heater = Heater;
Heater.urn = "urn:miot-spec-v2:service:heater:0000782E";
