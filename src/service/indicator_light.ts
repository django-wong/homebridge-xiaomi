import {Light} from "./light";

export class IndicatorLight extends Light {
    static urn = 'urn:miot-spec-v2:service:indicator-light:00007803';

    urn() {
        return IndicatorLight.urn;
    }
}
