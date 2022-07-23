"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditioner = exports.modeToHeatingCoolingState = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const heating_cooling_state_00000008_1 = require("../property/heating_cooling_state_00000008");
const target_temperature_00000021_1 = require("../property/target_temperature_00000021");
const environment_1 = require("./environment");
const current_temperature_00000020_1 = require("../property/current_temperature_00000020");
const eco_1 = require("../property/eco");
function modeToHeatingCoolingState(mode) {
    if (mode == null) {
        return 0; // 0: OFF, 1: HEAT, 2: COOL, 3: AUTO
    }
    return mode == 2 ? 2 : 1;
}
exports.modeToHeatingCoolingState = modeToHeatingCoolingState;
// Heater Cooler
class AirConditioner extends abstract_1.default {
    urn() {
        return AirConditioner.urn;
    }
    getHbService() {
        return this.api.hap.Service.Thermostat;
    }
    getRequiredProperties() {
        return [
            heating_cooling_state_00000008_1.Heating_cooling_state_00000008,
            target_temperature_00000021_1.Target_temperature_00000021,
        ];
    }
    getOptionalProperties() {
        return [
            eco_1.ECO
        ];
    }
    initialize() {
        this._currentTemperature();
        this._temperatureDisplayUnits();
        this._cooling_threshold_temperature();
        this._heating_threshold_temperature();
    }
    async isOn() {
        const res = await this.getPropertyValue('urn:miot-spec-v2:property:on:00000006');
        return res ? res : false;
    }
    async _getHeatingCoolingState() {
        if (!(await this.isOn())) {
            return this.hap.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        this.lastKnownState = modeToHeatingCoolingState(await this.getPropertyValue('urn:miot-spec-v2:property:mode:00000008'));
        return this.lastKnownState;
    }
    _currentTemperature() {
        const service = this.getService();
        service.getCharacteristic(this.hap.Characteristic.CurrentTemperature).onGet(async () => {
            let value = null;
            const environmentService = this.accessory.ofService(environment_1.Environment);
            if (environmentService) {
                value = await environmentService.getPropertyValue(current_temperature_00000020_1.CurrentTemperature_00000020);
            }
            console.info(`current temperature is ${value}`);
            return value;
        });
    }
    _temperatureDisplayUnits() {
        const service = this.getService();
        service.getCharacteristic(this.hap.Characteristic.TemperatureDisplayUnits).onGet(() => {
            return this.hap.Characteristic.TemperatureDisplayUnits.CELSIUS;
        });
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
exports.AirConditioner = AirConditioner;
AirConditioner.urn = "urn:miot-spec-v2:service:air-conditioner:0000780F";
