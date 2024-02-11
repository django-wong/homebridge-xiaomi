import fetch, { RequestInit } from 'node-fetch';
/**
 * Make a request to the Spec
 *
 * @param      {string}       path                  The path
 * @param      {RequestInit}  options?:RequestInit  The options request initialize
 */
export declare function request<T = {}>(path: string, options?: RequestInit): Promise<fetch.Response>;
/**
 * Finds an instance by model.
 *
 * @param      {string}  model   The model
 */
export declare function findInstanceByModel(model: string): MiIOSpec.InstanceDefinition | undefined;
/**
 * Fetches an instance feature definition by type.
 *
 * @param      {string}   type    The type
 */
export declare function fetchInstanceFeatureDefinitionByType(type: string): Promise<MiIOSpec.Instance | undefined>;
/**
 * Fetch device definition by type
 * @param type
 */
export declare function fetchDeviceDefinitionByType(type: string): Promise<MiIOSpec.Device | undefined>;
