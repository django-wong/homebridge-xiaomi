import { Service } from "homebridge";
import AbstractProperty, { AnyHbCharacteristic } from "./abstract";

/**
 * Set the characteristic as ON when on:00000006 was founds and positive in any services
 *
 * @class      AnyOn (name)
 */
export class AnyOn extends AbstractProperty<boolean> {
	static urn = 'urn:miot-spec-v2:property:on:00000006';

	getCharacteristic(): AnyHbCharacteristic {
		return this.Characteristic.On;
	}

    urn(): string {
        return AnyOn.urn;
    }

    init(): void {

        const other_service = this.service.getAccessory().getServices().find((service) => {
            return service.hasProperty(this.urn());
        })

        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
        	() => {
        		return other_service?.getPropertyValue(this.urn()) ?? false;
        	}
        ).onSet(
        	(on) => {
                if (other_service == this.service) {
                    this.setPropertyValue(!!on);
                }
        	}
        )
    }
}
