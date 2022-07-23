import { Service } from "homebridge";
import AbstractProperty, { AnyHbCharacteristic, DynamicProperty } from "./abstract";
import { ReadWrite } from "./lib/read_write";

export class ECO extends ReadWrite<boolean> {
	static urn = 'urn:miot-spec-v2:property:eco:00000024';

	urn(): string {
		return ECO.urn;    
	}

	getCharacteristic(): AnyHbCharacteristic {
	    return this.Characteristic.On;
	}

	platformService?: Service;

	getService() {
	    const accessory = this.service.getPlatformAccessory();

	    const service = accessory.getServiceById(this.service.hap.Service.Switch, this.urn());
	    if (service) {
	    	return service;
	    }

	    return accessory.addService(this.service.hap.Service.Switch, 'ECO', this.urn());
	}
}