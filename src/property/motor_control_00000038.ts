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
        const SERVICE = this.service.hap.Service.Switch;
        let service = this.service.getPlatformAccessory().getServiceById(SERVICE, item.value.toString());
        if (!service) {
            service = this.service.getPlatformAccessory().addService(
                SERVICE, item.description, item.value.toString()
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
                        this.resetExcept(service);
                    }
                }
                return active;
            }
        )

        this.switches.push([service, characteristic]);
    }

    private resetExcept(except: Service | undefined) {
        this.switches.forEach(([service, characteristic]) => {
            if (service != except) characteristic.setValue(false);
        })
    }
}
