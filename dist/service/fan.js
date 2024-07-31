"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan = exports.fanLevelToFanState = exports.onToFanState = exports.onToActive = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const name_unknown_1 = require("../property/name_unknown");
const fan_level_00000016_1 = require("../property/fan_level_00000016");
const on_00000006_1 = require("../property/on_00000006");
function onToActive(value) {
    return value ? 1 : 0;
}
exports.onToActive = onToActive;
function onToFanState(value) {
    return value ? 2 : 0;
}
exports.onToFanState = onToFanState;
function fanLevelToFanState(value) {
    return value == 0 ? 0 : 1;
}
exports.fanLevelToFanState = fanLevelToFanState;
class Fan extends abstract_1.default {
    urn() {
        return Fan.urn;
    }
    getHbService() {
        return this.hap.Service.Fanv2;
    }
    getOptionalProperties() {
        return [];
    }
    getDynamicProperties() {
        return [
            name_unknown_1.Name_unknown,
            on_00000006_1.On_00000006,
            fan_level_00000016_1.Fan_level_00000016
        ];
    }
}
exports.Fan = Fan;
Fan.urn = 'urn:miot-spec-v2:service:fan:00007808';
