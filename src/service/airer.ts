import { Motor_control_00000038 } from "../property/motor_control_00000038";
import AbstractService, {AnyHBService} from "./abstract";

export class Airer extends AbstractService {
    static urn = 'urn:miot-spec-v2:service:airer:00007817';

    urn(): string {
        return Airer.urn;
    }

    getHbService(): AnyHBService {
        throw new Error('Not Implemented')
    }

    getDynamicProperties() {
        return [
        ];
    }

    getRequiredProperties() {
        return [
            Motor_control_00000038
        ]
    }
}
