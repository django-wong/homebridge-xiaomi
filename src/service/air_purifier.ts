import { CharacteristicValue } from "homebridge";
import { Active_00000006 } from "../property/active_00000006";

import AbstractService, { AnyHBService, Property } from "./abstract";

export class AirPurifier extends AbstractService {
	static urn = 'urn:miot-spec-v2:service:air-purifier:00007811';

	targetAirpurifierState?: CharacteristicValue;

    urn(): string {
        return AirPurifier.urn;
    }

    getHbService(): AnyHBService {
        return this.hap.Service.AirPurifier;
    }

    getRequiredProperties(): Property[] {
        return [
        	Active_00000006,
        ]
    }

    initialize() {
    	const service = this.getService();

    	service.getCharacteristic(this.hap.Characteristic.CurrentAirPurifierState).onGet(
    		async () => {
    			const active = await this.getPropertyValue(Active_00000006);
    			return active 
    				? this.hap.Characteristic.CurrentAirPurifierState.PURIFYING_AIR 
    				: this.hap.Characteristic.CurrentAirPurifierState.INACTIVE
    		}
    	);

    	service.getCharacteristic(this.hap.Characteristic.TargetAirPurifierState).onSet(
    		(state) => {
    			this.targetAirpurifierState = state;
    			return state;
    		}
    	).onGet(
    		() => {
    			return this.targetAirpurifierState == null 
    				? this.hap.Characteristic.TargetAirPurifierState.AUTO 
    				: this.targetAirpurifierState;
    		}
    	)
    }
}
