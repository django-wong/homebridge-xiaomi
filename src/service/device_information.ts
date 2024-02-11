import AbstractService from './abstract';
import {Serial_number_00000003} from "../property/serial_number_00000003";
import {Manufacturer_00000001} from "../property/manufacturer_00000001";
import {Firmware_Revision_00000005} from "../property/firmware_revision_00000005";
import {Model_00000002} from "../property/model_00000002";


export class DeviceInformation extends AbstractService{
    static urn = 'urn:miot-spec-v2:service:device-information:00007801';

    urn(): string {
        return DeviceInformation.urn;
    }

    getRequiredProperties() {
        return [
            Serial_number_00000003,
            Manufacturer_00000001,
            Firmware_Revision_00000005,
            Model_00000002
        ];
    }

    getHbService() {
        return this.api.hap.Service.AccessoryInformation;
    }

    getService() {
        return this.getPlatformAccessory().getService(this.getHbService())!;
    }

    initialize(): void {
        this._identify();
        this._name();
    }

    _identify() {
        const service = this.getService();
        service.getCharacteristic(
            this.hap.Characteristic.Identify
        ).onSet(
            () => {
                console.info('identify is not implemented');
            }
        )
    }

    _name() {
        const service = this.getService();
        service.getCharacteristic(
            this.hap.Characteristic.Name
        ).onGet(
            () => {
                return this.device.name || "No Name";
            }
        )
    }
}
