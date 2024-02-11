import { Motor_control_00000038 } from "../property/motor_control_00000038";
import AbstractService, { AnyHBService } from "./abstract";
export declare class Airer extends AbstractService {
    static urn: string;
    urn(): string;
    getHbService(): AnyHBService;
    getDynamicProperties(): never[];
    getRequiredProperties(): (typeof Motor_control_00000038)[];
}
