"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractAction {
    constructor(service, actionDefinition) {
        this.service = service;
        this.actionDefinition = actionDefinition;
    }
    trigger(argument = undefined) {
        var _a;
        let siid = this.service.getServiceDefinition().iid;
        let aiid = (_a = this.actionDefinition) === null || _a === void 0 ? void 0 : _a.iid;
        if (siid && aiid) {
            this.service.getDevice().callAction({
                siid: siid,
                aiid: aiid,
                in: argument
            });
        }
    }
}
exports.default = AbstractAction;
