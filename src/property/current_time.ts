import AbstractProperty from "./abstract";

export class Current_time extends AbstractProperty {
	static urn = '';

    urn(): string {
        return Current_time.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CurrentTime).onGet(
        	() => {
        		return (new Date()).toISOString();
        	}
        )
    }
}
