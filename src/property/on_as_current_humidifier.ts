import AbstractProperty from './abstract';

export class OnAsCurrentHumidifier extends AbstractProperty {
	static urn = 'urn:miot-spec-v2:property:on:00000006';

    urn(): string {
        return OnAsCurrentHumidifier.urn;
    }

    init(): void {
        this.getService().getCharacteristic(this.Characteristic.CurrentHumidifierDehumidifierState).onGet(
        	async () => {
        		const is_on = await this.getPropertyValue();
        		if (is_on) {
        			return this.Characteristic.CurrentHumidifierDehumidifierState.HUMIDIFYING;
        		} else {
					return this.Characteristic.CurrentHumidifierDehumidifierState.IDLE;
				}
        	}
        )
    }
}
