"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertical_swing_00000018 = void 0;
const abstract_1 = __importDefault(require("./abstract"));
class Vertical_swing_00000018 extends abstract_1.default {
    init() {
        this.getService().getCharacteristic(this.Characteristic.SwingMode).onGet(() => {
            return this.getPropertyValue();
        }).onSet((enabled) => {
            this.setPropertyValue(!!enabled);
        });
    }
    urn() {
        return Vertical_swing_00000018.urn;
    }
}
exports.Vertical_swing_00000018 = Vertical_swing_00000018;
Vertical_swing_00000018.urn = 'urn:miot-spec-v2:property:vertical-swing:00000018';
