"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalOrVerticalSwing = void 0;
const abstract_1 = require("./abstract");
const vertical_swing_00000018_1 = require("./vertical_swing_00000018");
const horizontal_swing_00000018_1 = require("./horizontal_swing_00000018");
class HorizontalOrVerticalSwing extends abstract_1.DynamicProperty {
    urn() {
        if (this.service.hasProperty(horizontal_swing_00000018_1.Horizontal_swing_00000018.urn)) {
            return horizontal_swing_00000018_1.Horizontal_swing_00000018.urn;
        }
        if (this.service.hasProperty(vertical_swing_00000018_1.Vertical_swing_00000018.urn)) {
            return vertical_swing_00000018_1.Vertical_swing_00000018.urn;
        }
        throw new Error('No swing property found');
    }
    init() {
        try {
            const urn = this.urn();
            this.getService().getCharacteristic(this.Characteristic.SwingMode).onGet(async () => {
                const value = await this.service.getPropertyValue(urn);
                return !!value;
            }).onSet(async (value) => {
                await this.service.setPropertyValue(urn, !!value);
                return value;
            });
        }
        catch (e) {
            return;
        }
    }
}
exports.HorizontalOrVerticalSwing = HorizontalOrVerticalSwing;
