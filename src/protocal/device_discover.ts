import Device from '../device/device';

import EventEmitter from "events";

export type Event = {
	ON_DEVICE: 'on-device'
}

export default abstract class DeviceDiscoverProtocal extends EventEmitter {
	constructor() {
		super({
			captureRejections: false
		});
	}

	abstract discoverDevices(): this
	abstract onDeviceAvailable(callback: (device: Device) => void): this
}