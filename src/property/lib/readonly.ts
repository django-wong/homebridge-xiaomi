import AbstractProperty, { AnyHbCharacteristic } from "../abstract";

export abstract class Readonly<T = any> extends AbstractProperty<T> {
    abstract getCharacteristic(): AnyHbCharacteristic;

    init(): void {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
        	async () => {
        		return this.in(await this.getPropertyValue()) as any;
        	}
        )
    }

    in(value: Nullable<T>) {
    	return value;
    }
}
