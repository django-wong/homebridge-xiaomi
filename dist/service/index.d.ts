import InstanceService = MiIOSpec.InstanceService;
import { Service } from "./abstract";
export declare function findService(service: InstanceService): Service | undefined;
export declare function findServiceByType(type: string): Service | undefined;
