// import { Service } from "homebridge";
import AbstractService, {Property} from "./abstract";
import {On_00000006} from "../property/on_00000006";
import {Brightness_0000000D} from "../property/brightness_0000000D";
import {Color_temperature_0000000F} from "../property/color_temperature_0000000F";
// import {OptionalProperties, RequiredProperties} from "../lib/decorator";
// import {On_00000006} from "../property/on_00000006";
// import {Brightness_0000000D} from "../property/brightness_0000000D";

// @RequiredProperties([
//     On_00000006
// ])
// @OptionalProperties([
//     Brightness_0000000D
// ])
export class Light extends AbstractService {
	static urn = 'urn:miot-spec-v2:service:light:00007802';

    getRequiredProperties(): Array<Property> {
        return [
            On_00000006
        ];
    }

    getOptionalProperties(): Array<Property> {
        return [
            Brightness_0000000D,
            Color_temperature_0000000F
        ]
    }

    urn(): string {
        return Light.urn;
    }

    getHbService() {
        return this.hap.Service.Lightbulb;
    }

    initialize(): void {}
}
