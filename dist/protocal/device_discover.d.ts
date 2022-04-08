/// <reference types="node" />
import Device from '../device/device';
import EventEmitter from "events";
export declare type Event = {
    ON_DEVICE: 'on-device';
};
export default abstract class DeviceDiscoverProtocal extends EventEmitter {
    constructor();
    abstract discoverDevices(): this;
    abstract onDeviceAvailable(callback: (device: Device) => void): this;
}
