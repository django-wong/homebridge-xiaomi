import AbstractAction from ".";

export class Identify extends AbstractAction {
	static urn = 'urn:miot-spec-v2:action:identify:00002801';

	urn(): string {
	    return Identify.urn;
	}
}