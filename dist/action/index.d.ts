import Service from "../service/abstract";
import InstanceAction = MiIOSpec.InstanceAction;
export default abstract class AbstractAction {
    protected service: Service;
    protected actionDefinition?: InstanceAction | undefined;
    constructor(service: Service, actionDefinition?: InstanceAction | undefined);
    abstract urn(): string;
    trigger(argument?: undefined): void;
}
