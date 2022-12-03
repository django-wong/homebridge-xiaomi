import AbstractService, { AnyHBService, Property } from "./abstract";
import {On_00000006} from "../property/on_00000006";
import {Environment} from "./environment";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";

export class Heater extends AbstractService {
    getHbService(): AnyHBService {
        return this.canActAsThermostat ? this.api.hap.Service.Thermostat : this.api.hap.Service.Switch;
    }

    static urn = "urn:miot-spec-v2:service:heater:0000782E"


    /**
     * Heater can act as thermostat if it can set target temperature
     */
    get canActAsThermostat() {
        return this.hasProperty('urn:miot-spec-v2:property:target-temperature:00000021');
    }

    urn(): string {
        return Heater.urn;
    }

    getRequiredProperties(): Array<Property> {
        return this.canActAsThermostat ? [] : [
            On_00000006,
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
        this.getService().getCharacteristic(this.api.hap.Characteristic.CurrentHeatingCoolingState).onGet(
            async () => {
                const value = await this.getPropertyValue(On_00000006);
                return value
                    ? this.api.hap.Characteristic.CurrentHeatingCoolingState.HEAT
                    : this.api.hap.Characteristic.CurrentHeatingCoolingState.OFF;
            }
        );

        this.getService().getCharacteristic(this.api.hap.Characteristic.TargetHeatingCoolingState).onSet(
            async () => {
                const value = await this.getPropertyValue(On_00000006);
                return value
                    ? this.api.hap.Characteristic.CurrentHeatingCoolingState.HEAT
                    : this.api.hap.Characteristic.CurrentHeatingCoolingState.OFF;
            }
        ).onSet(
            async (value) => {
                await this.setPropertyValue(On_00000006, value > 0);
            }
        ).setProps({
            minValue: 0,
            maxValue: 1, minStep: 1,
        })
    }

    initTemperature() {
        const property = this.findProperty('urn:miot-spec-v2:property:target-temperature:00000021');
        if (!property) {
            return;
        }

        let minValue = 10;
        let maxValue = 38
        let step = 1;

        if (property['value-range']) {
            minValue = property['value-range'][0];
            maxValue = property['value-range'][1];
            step = property['value-range'][2];
        }

        this.getService().getCharacteristic(this.api.hap.Characteristic.CurrentTemperature).onGet(
            async () => {
                // Read from environment service
                const environment = this.accessory.getService(Environment);
                if (environment) {
                    return environment.getPropertyValue(CurrentTemperature_00000020);
                }
                const value = await this.getPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021');
                return value;
            }
        )

        this.getService().getCharacteristic(this.api.hap.Characteristic.TargetTemperature).onGet(
            async () => {
                const value = await this.getPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021');
                return value;
            }
        ).onSet(
            async (value) => {
                await this.setPropertyValue('urn:miot-spec-v2:property:target-temperature:00000021', value as number);
            }
        ).setProps({
            minValue: minValue,
            maxValue: maxValue, minStep: step,  unit: 'celsius'
        })
    }
}
