declare namespace MiIOSpec {
	export type InstanceDefinition = {
		"status": "released" | "debug" | "preview"
		"model": string
		"version": number
		"type": string
	}

	type GenericResponse = {
		"types": string[]
	}

	export type Device = {
		"type": string
		"description": string
		"required-services"?: string[]
		"optional-services"?: string[]
	}

	export type Service = {
		"type": string
		"description": string
		"required-properties"?: string[]
		"optional-properties"?: string[]
		"required-actions"?: string[]
		"optional-actions"?: string[]
		"required-events": string[]
		"optional-events"?: string[]
	}


	export type Action = {
		"type": string
		"description": string
		"in": any[]
		"out": any[]
	}

	export type Event = {
		"type": string
		"description": string
		"arguments"?: string[]
	}

	export type Instances = {
		"instances": string[]
	}


	export type DetailedInstances = {
		"instances": InstanceDefinition[]
	}

	export type PropertyAccess = "read" | "write" | "notify" | string

	export type PrimitiveValue = string | boolean | number

	export type KnownUnit =
		"percentage" | "rgb" | "kelvin" | "seconds" | "hours" | "arcdegrees" |
		"watt" | "ppm" | "mg/m3" | "celsius" | "minutes" | "days" | "pascal" |
		"litre" | "lux"

	export type Unit = KnownUnit | string

	export type MinValue = number

	export type MaxValue = number

	export type Step = number

	export type ValueRange = [MinValue, MaxValue, Step];

	export type PossibleValue = {
		"value": PrimitiveValue
		"description": string
	}

	export type PropertyFormat =
		"bool" | "uint8" | "string" | "uint16" | "uint32" | "int8" | "int16" | "int32" | "int64" | "float" | "string" | "hex"

	export type Property = {
		"type": string
		"description": string
		"format": PropertyFormat
		"access": PropertyAccess[]
		"value-list"?: PossibleValue[]
		"unit"?: Unit
		"value-range"?: ValueRange
		"max-length"?: number
	}

	type WithIID<T> = {"iid": number} & T

	export type InstanceProperty = WithIID<Property>

	export type InstanceEvent = WithIID<Event>

	export type InstanceAction = WithIID<Action>

	export type InstanceService = {
		"iid": 3
		"type": string
		"description": string
		"events": InstanceEvent[]
		"properties"?: InstanceProperty[]
		"actions": InstanceAction[]
	}

	export type Instance = {
		"type": string
		"description": string
		"services": InstanceService[]
	}
}
