import AbstractService, {AnyHBService, Property} from "../abstract";
import {Relative_humidity_0000000C} from "../../property/relative_humidity_0000000C";

export class Humidity extends AbstractService {
    getHbService(): AnyHBService {
        return this.hap.Service.HumiditySensor
    }

    urn(): string {
        return "";
    }

    getOptionalProperties(): Array<Property> {
        return [
            Relative_humidity_0000000C
        ]
    }
}
