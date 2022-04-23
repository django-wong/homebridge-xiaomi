import AbstractProperty from './abstract';

export class CurrentHumidifierDehumidifierOn extends AbstractProperty {
	static urn = 'urn:miot-spec-v2:property:on:00000006';

    urn(): string {
        return CurrentHumidifierDehumidifierOn.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CurrentHumidifierDehumidifierState).onGet(
        	async () => {
        		const is_on = await this.getPropertyValue();
        		if (is_on) {
        			return this.Characteristic.CurrentHumidifierDehumidifierState.HUMIDIFYING;
        		} else {
					return this.Characteristic.CurrentHumidifierDehumidifierState.INACTIVE;
				}
        	}
        ).setProps({
        	minValue: 0,
        	maxValue: 2,
			minStep: 1
        })
    }
}
