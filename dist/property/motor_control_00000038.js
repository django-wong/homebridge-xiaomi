"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motor_control_00000038 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Motor_control_00000038 extends abstract_1.default {
    constructor() {
        super(...arguments);
        this.switches = [];
    }
    urn() {
        return Motor_control_00000038.urn;
    }
    init() {
        var _a;
        const definition = this.getPropertyDefinition();
        if (!definition) {
            throw new Error(`Service has no property: ${Motor_control_00000038.urn}`);
        }
        (_a = definition["value-list"]) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            this.createService(item);
        });
    }
    createService(item) {
        const serviceCons = this.service.hap.Service.Switch;
        let service = this.service.getPlatformAccessory().getServiceById(serviceCons, item.value.toString());
        if (!service) {
            service = this.service.getPlatformAccessory().addService(serviceCons, item.description, item.value.toString());
        }
        let active = false;
        const characteristic = service.getCharacteristic(this.Characteristic.On).onGet(() => {
            return active;
        }).onSet(async (bool) => {
            if (typeof bool === 'boolean') {
                active = bool;
                if (active) {
                    await this.setPropertyValue(item.value);
                    await this.reset();
                }
                else {
                    await this.setPropertyValue(0);
                }
            }
            return active;
        });
        service.getCharacteristic(this.Characteristic.ActiveIdentifier).onGet(() => {
            return item.value;
        });
        this.switches.push([service, characteristic]);
    }
    reset() {
        this.switches.forEach(([service, characteristic]) => {
            characteristic.setValue(false);
        });
    }
}
exports.Motor_control_00000038 = Motor_control_00000038;
Motor_control_00000038.urn = 'urn:miot-spec-v2:property:motor-control:00000038';
