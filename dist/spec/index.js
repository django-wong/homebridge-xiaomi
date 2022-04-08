"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDeviceDefinitionByType = exports.fetchInstanceFeatureDefinitionByType = exports.findInstanceByModel = exports.request = void 0;
const instances_json_1 = __importDefault(require("./instances.json"));
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Make a request to the Spec
 *
 * @param      {string}       path                  The path
 * @param      {RequestInit}  options?:RequestInit  The options request initialize
 */
function request(path, options) {
    return (0, node_fetch_1.default)(`http://miot-spec.org/miot-spec-v2/${path}`, options);
}
exports.request = request;
/**
 * Finds an instance by model.
 *
 * @param      {string}  model   The model
 */
function findInstanceByModel(model) {
    return instances_json_1.default.instances.find((instance) => {
        return instance.model == model && instance.status == 'released';
    });
}
exports.findInstanceByModel = findInstanceByModel;
/**
 * Fetches an instance feature definition by type.
 *
 * @param      {string}   type    The type
 */
async function fetchInstanceFeatureDefinitionByType(type) {
    const data = await request(`instance?type=${type}`);
    return await data.json();
}
exports.fetchInstanceFeatureDefinitionByType = fetchInstanceFeatureDefinitionByType;
/**
 * Fetch device definition by type
 * @param type
 */
async function fetchDeviceDefinitionByType(type) {
    const urn = type.split(':').slice(0, 5).join(':');
    const data = await request(`spec/device?type=${urn}`);
    return await data.json();
}
exports.fetchDeviceDefinitionByType = fetchDeviceDefinitionByType;
