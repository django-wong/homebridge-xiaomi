import AbstractService, {Property} from "./abstract";
import {CharacteristicValue, Nullable, Service} from "homebridge";
import {On_00000006} from "../property/on_00000006";
import {Heating_cooling_state_00000008} from "../property/heating_cooling_state_00000008";
import {Target_temperature_00000021} from "../property/target_temperature_00000021";
import {Environment} from "./environment";
import {CurrentTemperature_00000020} from "../property/current_temperature_00000020";
import {Active_00000006} from "../property/active_00000006";
import {Heater_cooler_state_00000008} from "../property/heater_cooler_state_00000008";

export function modeToHeatingCoolingState(mode: Nullable<number>) {
    if (mode == null) {
        return 0; // 0: OFF, 1: HEAT, 2: COOL, 3: AUTO
    }
    return mode == 2 ? 2 : 1
}

// Heater Cooler

export class AirConditioner extends AbstractService {

    urn(): string {
        return AirConditioner.urn;
    }

    static urn = "urn:miot-spec-v2:service:air-conditioner:0000780F"

    lastKnownState?: number;

    getHbService() {
        return this.api.hap.Service.Thermostat;
    }

    getRequiredProperties(): Array<Property> {
        return [
            Heating_cooling_state_00000008,
            Target_temperature_00000021,
        ]
    }

    initialize() {
        this._currentTemperature();
        this._temperatureDisplayUnits();
        this._cooling_threshold_temperature();
        this._heating_threshold_temperature();
    }

    async _setTargetHeatingCoolingState(value: CharacteristicValue) {
        switch (value) {
        case this.hap.Characteristic.TargetHeatingCoolingState.OFF:
            await this.setPropertyValue(
                'urn:miot-spec-v2:property:on:00000006', false
            )
            break;
        case this.hap.Characteristic.TargetHeatingCoolingState.AUTO:
            await this.setPropertiesValue({
                'urn:miot-spec-v2:property:on:00000006': true,
                'urn:miot-spec-v2:property:mode:00000008': this.lastKnownState || 2
            });
            break;
        case this.hap.Characteristic.TargetHeatingCoolingState.COOL:
            await this.setPropertiesValue({
                'urn:miot-spec-v2:property:on:00000006': true,
                'urn:miot-spec-v2:property:mode:00000008': 2
            });
            break;
        case this.hap.Characteristic.TargetHeatingCoolingState.HEAT:
            await this.setPropertiesValue({
                'urn:miot-spec-v2:property:on:00000006': true,
                'urn:miot-spec-v2:property:mode:00000008': 1
            });
            break;
        }
    }


    async isOn(): Promise<boolean> {
        const res = await this.getPropertyValue<boolean>('urn:miot-spec-v2:property:on:00000006');
        return res ? res : false;
    }


    async _getHeatingCoolingState() {
        if (!(await this.isOn())) {
            return this.hap.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        this.lastKnownState = modeToHeatingCoolingState(
            await this.getPropertyValue<number>(
                'urn:miot-spec-v2:property:mode:00000008'
            )
        );
        return this.lastKnownState;
    }

    _currentTemperature() {
        const service = this.getService();
        service.getCharacteristic(
            this.hap.Characteristic.CurrentTemperature
        ).onGet(
            async () => {
                let value = null;
                const environmentService = this.accessory.ofService(Environment);
                if (environmentService) {
                    value = await environmentService.getPropertyValue<number>(CurrentTemperature_00000020)
                }
                console.info(`current temperature is ${value}`);
                return value;
            }
        )
    }


    _temperatureDisplayUnits() {
        const service = this.getService();
        service.getCharacteristic(
            this.hap.Characteristic.TemperatureDisplayUnits
        ).onGet(
            () => {
                return this.hap.Characteristic.TemperatureDisplayUnits.CELSIUS
            }
        )
    }

    _heating_threshold_temperature() {
        // this.getService().getCharacteristic(this.hap.Characteristic.HeatingThresholdTemperature).setProps({
        //     minStep: 1,
        //     maxValue: 35,
        //     minValue: 16
        // });
    }

    _cooling_threshold_temperature() {
        // this.getService().getCharacteristic(this.hap.Characteristic.CoolingThresholdTemperature).setProps({
        //     minStep: 1,
        //     maxValue: 30,
        //     minValue: 16
        // })
    }
}


// export class AirConditioner extends AbstractService {
//     static type = "urn:miot-spec-v2:service:air-conditioner:0000780F"
//
//     getHbService(): typeof Service {
//         return this.hap.Service.HeaterCooler;
//     }
//
//     getType(): string {
//         return AirConditioner.type;
//     }
//
//     getRequiredProperties(): Array<Property> {
//         return [
//             Active_00000006,
//             Heater_cooler_state_00000008
//         ];
//     }
// }
