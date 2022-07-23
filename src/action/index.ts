import Service from "../service/abstract";
import InstanceAction = MiIOSpec.InstanceAction;

export default abstract class AbstractAction {
	constructor(protected service: Service, protected actionDefinition?: InstanceAction) {

	}

	abstract urn(): string;

	trigger(argument = undefined) {
		let siid = this.service.getServiceDefinition().iid;
		let aiid = this.actionDefinition?.iid;
		if (siid && aiid) {
			this.service.getDevice().callAction({
				siid: siid!,
				aiid: aiid!,
				in: argument
			});
		}
	}
}