import AbstractProperty from "./abstract";
import {Service, Characteristic} from "homebridge";

export class Motor_control_00000038 extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:motor-control:00000038';

    switches: [Service, Characteristic][] = [];

    urn(): string {
        return Motor_control_00000038.urn;
    }

    init(): void {
        const definition = this.getPropertyDefinition();
        if (!definition) {
            throw new Error(`Service has no property: ${Motor_control_00000038.urn}`);
        }
        definition["value-list"]?.forEach((item) => {
            this.createService(item)
        })
    }



    createService(item: MiIOSpec.PossibleValue) {
        const serviceCons = this.service.hap.Service.Switch;
        let service = this.service.getPlatformAccessory().getServiceById(serviceCons, item.value.toString());
        if (!service) {
            service = this.service.getPlatformAccessory().addService(
                serviceCons, item.description, item.value.toString()
            );
        }

        let active = false;

        const characteristic = service.getCharacteristic(this.Characteristic.On).onGet(
            () => {
                return active;
            }
        ).onSet(
            async (bool) => {
                if (typeof bool === 'boolean') {
                    active = bool;
                    if (active) {
                        await this.setPropertyValue(item.value);
                        await this.reset();
                    } else {
                        await this.setPropertyValue(0);
                    }
                }
                return active;
            }
        )

        service.getCharacteristic(this.Characteristic.ActiveIdentifier).onGet(
            () => {
                return item.value;
            }
        )

        this.switches.push([service, characteristic]);
    }

    private reset() {
        this.switches.forEach(([service, characteristic]) => {
            characteristic.setValue(false);
        })
    }
}
