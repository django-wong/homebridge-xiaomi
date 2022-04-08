"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FanControl = exports.fanLevelToFanState = exports.onToFanState = exports.onToActive = void 0;
const abstract_1 = __importDefault(require("./abstract"));
const rotation_speed_00000016_1 = require("../property/rotation_speed_00000016");
const vertical_swing_00000018_1 = require("../property/vertical_swing_00000018");
const horizontal_swing_00000018_1 = require("../property/horizontal_swing_00000018");
const name_unknown_1 = require("../property/name_unknown");
const any_active_1 = require("../property/any_active");
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
class FanControl extends abstract_1.default {
    urn() {
        return FanControl.urn;
    }
    getHbService() {
        return this.hap.Service.Fanv2;
    }
    getOptionalProperties() {
        return [
            rotation_speed_00000016_1.Rotation_speed_00000016,
            vertical_swing_00000018_1.Vertical_swing_00000018,
            horizontal_swing_00000018_1.Horizontal_swing_00000018
        ];
    }
    getDynamicProperties() {
        return [
            name_unknown_1.Name_unknown,
            any_active_1.AnyActive,
        ];
    }
}
exports.FanControl = FanControl;
FanControl.urn = 'urn:miot-spec-v2:service:fan-control:00007809';
