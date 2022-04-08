"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyOn = void 0;
const abstract_1 = __importDefault(require("./abstract"));
/**
 * Set the characteristic as ON when on:00000006 was founds and positive in any services
 *
 * @class      AnyOn (name)
 */
class AnyOn extends abstract_1.default {
    getCharacteristic() {
        return this.Characteristic.On;
    }
    urn() {
        return AnyOn.urn;
    }
    init() {
        const other_service = this.service.getAccessory().getServices().find((service) => {
            return service.hasProperty(this.urn());
        });
        this.getService().getCharacteristic(this.getCharacteristic()).onGet(() => {
            var _a;
            return (_a = other_service === null || other_service === void 0 ? void 0 : other_service.getPropertyValue(this.urn())) !== null && _a !== void 0 ? _a : false;
        }).onSet((on) => {
            if (other_service == this.service) {
                this.setPropertyValue(!!on);
            }
        });
    }
}
exports.AnyOn = AnyOn;
AnyOn.urn = 'urn:miot-spec-v2:property:on:00000006';
