import AbstractService, {AnyHBService} from "./abstract";
import {Mute_00000040} from "../property/mute_00000040";
import {Volume_00000013} from "../property/volume_00000013";

export class Speaker extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:speaker:0000781C';

    getHbService(): AnyHBService {
        return this.hap.Service.Speaker;
    }

    getRequiredProperties() {
        return [
            Mute_00000040,
            Volume_00000013
        ]
    }

    urn(): string {
        return Speaker.urn;
    }
}
