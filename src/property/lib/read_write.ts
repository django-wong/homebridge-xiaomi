import { CharacteristicValue } from "homebridge";
import AbstractProperty, { AnyHbCharacteristic } from "../abstract";
import { Readonly } from "./readonly";

export abstract class ReadWrite<T extends MiIOSpec.PrimitiveValue> extends Readonly<T> {
	abstract getCharacteristic(): AnyHbCharacteristic;

    init(): void {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
        	async () => {
        		return this.in(await this.getPropertyValue());
        	}
        ).onSet(
        	(value: CharacteristicValue) => {
        		return this.setPropertyValue(this.out(value));
        	}
        )
    }

    out(value: CharacteristicValue) {
    	return value as T;
    }
}
