import AbstractProperty from './abstract';

export class StatusLowBattery extends AbstractProperty {
	static urn = '';
	
    urn(): string {
        throw new Error('Method not implemented.');
    }
    init(): void {
        throw new Error('Method not implemented.');
    }
}
