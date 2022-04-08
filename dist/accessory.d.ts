import Device from "./device/device";
import { API, Logging, PlatformAccessory } from "homebridge";
import { Device as AccessoryContext } from "./lib/micloud";
import AbstractService from "./service/abstract";
import InstanceService = MiIOSpec.InstanceService;
export default class Accessory {
    private device;
    private accessory;
    private api;
    private log;
    private services;
    constructor(device: Device, accessory: PlatformAccessory<AccessoryContext>, api: API, log: Logging);
    get did(): string;
    init(): Promise<void>;
    createService(definition: InstanceService): void;
    getServices(): AbstractService[];
    getPlatformAccessory(): PlatformAccessory<AccessoryContext>;
    ofService(name: typeof AbstractService): AbstractService | undefined;
}
