"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorLight = void 0;
const light_1 = require("./light");
class IndicatorLight extends light_1.Light {
    urn() {
        return IndicatorLight.urn;
    }
}
exports.IndicatorLight = IndicatorLight;
IndicatorLight.urn = 'urn:miot-spec-v2:service:indicator-light:00007803';
