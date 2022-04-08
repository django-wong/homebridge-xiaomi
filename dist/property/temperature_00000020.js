"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperature_00000020 = void 0;
var abstract_1 = __importDefault(require("./abstract"));
var Temperature_00000020 = /** @class */ (function (_super) {
    __extends(Temperature_00000020, _super);
    function Temperature_00000020() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Temperature_00000020.prototype.init = function () {
        var _this = this;
        this.getService().getCharacteristic(this.Characteristic.CurrentTemperature).onGet(function () {
            return _this.getPropertyValue();
        });
    };
    Temperature_00000020.prototype.urn = function () {
        return Temperature_00000020.urn;
    };
    Temperature_00000020.urn = 'urn:miot-spec-v2:property:temperature:00000020';
    return Temperature_00000020;
}(abstract_1.default));
exports.Temperature_00000020 = Temperature_00000020;
