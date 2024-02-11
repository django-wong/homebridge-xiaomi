"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServiceByType = exports.findService = void 0;
const air_conditioner_1 = require("./air_conditioner");
const device_information_1 = require("./device_information");
const light_1 = require("./light");
const fan_control_1 = require("./fan_control");
const environment_1 = require("./environment");
const battery_1 = require("./battery");
const air_purifier_1 = require("./air_purifier");
const speaker_1 = require("./speaker");
const humidifier_1 = require("./humidifier");
const heater_1 = require("./heater");
const Services = [
    device_information_1.DeviceInformation, air_conditioner_1.AirConditioner, light_1.Light, environment_1.Environment, fan_control_1.FanControl, battery_1.Battery, air_purifier_1.AirPurifier, speaker_1.Speaker, humidifier_1.Humidifier, heater_1.Heater
];
function isEqual(left, right) {
    return left === right;
}
function findService(service) {
    return Services.find((S) => {
        return isEqual(S.urn, service.type.split(':').splice(0, 5).join(':'));
    });
}
exports.findService = findService;
function findServiceByType(type) {
    return Services.find((S) => {
        return S.urn === type.split(':').splice(0, 5).join(':');
    });
}
exports.findServiceByType = findServiceByType;
