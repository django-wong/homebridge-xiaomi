import AbstractProperty, { AnyHbCharacteristic } from "../abstract";

export abstract class Readonly<T extends MiIOSpec.PrimitiveValue> extends AbstractProperty<T> {
    abstract getCharacteristic(): AnyHbCharacteristic;

    init(): void {
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(
        	async () => {
        		return this.in(await this.getPropertyValue());
        	}
        )
    }

    in(value: Nullable<T>) {
    	return value;
    }
}
