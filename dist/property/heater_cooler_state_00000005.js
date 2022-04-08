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
exports.Heater_cooler_state_00000005 = void 0;
var abstract_1 = __importDefault(require("./abstract"));
var Heater_cooler_state_00000005 = /** @class */ (function (_super) {
    __extends(Heater_cooler_state_00000005, _super);
    function Heater_cooler_state_00000005() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Heater_cooler_state_00000005.prototype.init = function () {
    };
    Heater_cooler_state_00000005.prototype.urn = function () {
        return Heater_cooler_state_00000005.urn;
    };
    Heater_cooler_state_00000005.urn = '';
    return Heater_cooler_state_00000005;
}(abstract_1.default));
exports.Heater_cooler_state_00000005 = Heater_cooler_state_00000005;
