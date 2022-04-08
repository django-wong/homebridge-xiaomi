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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode_00000008 = void 0;
var abstract_1 = __importDefault(require("./abstract"));
var on_00000006_1 = require("./on_00000006");
var Mode_00000008 = /** @class */ (function (_super) {
    __extends(Mode_00000008, _super);
    function Mode_00000008() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mode_00000008.prototype.init = function () {
        var _this = this;
        this.getService().getCharacteristic(this.Characteristic.CurrentHeatingCoolingState).onGet(function () { return __awaiter(_this, void 0, void 0, function () {
            var isOn, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getPropertyValue(on_00000006_1.On_00000006.urn, false)];
                    case 1:
                        isOn = _a.sent();
                        if (!isOn) {
                            return [2 /*return*/, this.Characteristic.CurrentHeatingCoolingState.OFF];
                        }
                        return [4 /*yield*/, this.getPropertyValue()];
                    case 2:
                        value = _a.sent();
                        return [2 /*return*/, this.value2state(value)];
                }
            });
        }); });
        this.getService().getCharacteristic(this.Characteristic.TargetHeatingCoolingState).onGet(function () { return __awaiter(_this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPropertyValue()];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            return [2 /*return*/, this.Characteristic.TargetHeatingCoolingState.OFF];
                        }
                        return [2 /*return*/, this.value2state(value)];
                }
            });
        }); }).onSet(function (value) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.info("Set target heating cooling state to: ".concat(value));
                        _a = value;
                        switch (_a) {
                            case this.Characteristic.TargetHeatingCoolingState.OFF: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 2];
                    case 1: return [2 /*return*/, this.service.setPropertyValue(on_00000006_1.On_00000006.urn, false)];
                    case 2: return [4 /*yield*/, this.service.setPropertyValue(on_00000006_1.On_00000006.urn, true)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this.setPropertyValue(this.state2value(value))];
                }
            });
        }); });
    };
    Mode_00000008.prototype.urn = function () {
        return Mode_00000008.urn;
    };
    Mode_00000008.prototype.state2value = function (state) {
        switch (state) {
            case this.Characteristic.TargetHeatingCoolingState.OFF:
                throw new Error('unsupported');
            case this.Characteristic.TargetHeatingCoolingState.HEAT:
                return 5;
            case this.Characteristic.TargetHeatingCoolingState.COOL:
                return 2;
            case this.Characteristic.TargetHeatingCoolingState.AUTO:
                return 0;
            default:
                throw new Error('unsupported');
        }
    };
    Mode_00000008.prototype.value2state = function (value) {
        // 2 = Cool
        // 5 = Heat
        // 4 = Fan
        // 3 = Dry
        // 0 = Auto
        // 1 = Unknown
        switch (value) {
            case 2:
                return this.Characteristic.TargetHeatingCoolingState.COOL;
            case 5:
                return this.Characteristic.TargetHeatingCoolingState.HEAT;
            case 4:
            case 3:
            case 0:
                return this.Characteristic.TargetHeatingCoolingState.AUTO;
            default:
                throw new Error('unsupported');
        }
    };
    Mode_00000008.urn = 'urn:miot-spec-v2:property:mode:00000008';
    return Mode_00000008;
}(abstract_1.default));
exports.Mode_00000008 = Mode_00000008;
