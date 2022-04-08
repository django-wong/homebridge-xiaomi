type WithDid<T> = T & { did: string }

type IID = number

type SetPropertyOption = GetPropertyOption & {
	value: any
}

type GetPropertyOption = {
	siid: IID, piid: IID
}

type GetPropertyResult = {
	did: string
	siid: number
	piid: number
	value: any
	code: number
	updateTime?: number
}

type ComputedProperty = {
	siid: IID
	piid: IID
	format: MiIOSpec.PropertyFormat | string
	did: string,
	description?: string
}

type CallActionOption = {
  in: any
  siid: number
  aiid: number
}

type SetDevicePropertyOption = WithDid<SetPropertyOption>

type GetDevicePropertyOption = WithDid<GetPropertyOption>

type CallDeviceActionOption  = WithDid<CallActionOption>

type AvailableCountry = 'ru' | 'us' | 'tw' | 'sg' | 'cn' | 'de' | 'in' | 'i2'

type Nullable<T> = T | null

type Optional<T> = Nullable<T> | undefined
