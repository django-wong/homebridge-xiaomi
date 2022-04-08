import INSTANCES from './instances.json';
import fetch, { RequestInit, Response } from 'node-fetch';

/**
 * Make a request to the Spec
 *
 * @param      {string}       path                  The path
 * @param      {RequestInit}  options?:RequestInit  The options request initialize
 */
export function request<T = {}>(path: string, options?: RequestInit) {
    return fetch(`http://miot-spec.org/miot-spec-v2/${path}`, options)
}

/**
 * Finds an instance by model.
 *
 * @param      {string}  model   The model
 */
export function findInstanceByModel(model: string) {
	return INSTANCES.instances.find((instance) => {
		return instance.model == model && instance.status == 'released';
	}) as MiIOSpec.InstanceDefinition | undefined;
}

/**
 * Fetches an instance feature definition by type.
 *
 * @param      {string}   type    The type
 */
export async function fetchInstanceFeatureDefinitionByType(type: string) {
	const data = await request(`instance?type=${type}`);
	return await data.json() as MiIOSpec.Instance | undefined;
}


/**
 * Fetch device definition by type
 * @param type
 */
export async function fetchDeviceDefinitionByType(type: string) {
    const urn = type.split(':').slice(0, 5).join(':');
    const data = await request(`spec/device?type=${urn}`);
    return await data.json() as MiIOSpec.Device | undefined;
}
