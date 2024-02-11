import DeviceDiscover from '../protocal/device_discover';
type Nullable<T> = T | null;
type IntBool = 0 | 1;
export interface Device {
    longitude: string | '0.00000000';
    latitude: string | '0.00000000';
    did: string;
    token: string;
    name: string;
    pid: string | '0';
    localip: string;
    mac: string;
    ssid: string;
    bssid: string;
    parent_id: string | '';
    parent_model: string | '';
    show_mode: IntBool;
    model: string;
    adminFlag: IntBool;
    shareFlag: IntBool;
    permitLevel: number;
    isOnline: boolean;
    desc: string;
    extra?: {
        isSetPincode?: IntBool;
        pincodeType?: number;
        fw_version?: string;
        needVerifyCode?: IntBool;
        isPasswordEncrypt?: IntBool;
        platform?: string | 'R2100' | 'R4A';
        mcu_version?: string;
    };
    uid: number;
    pd_id: number;
    password: string | '';
    p2p_id: string | '';
    rssi: number;
    family_id: number | 0;
    reset_flag: IntBool;
    prop?: {
        [key: string]: any;
    };
}
export type MiCloudConstructOptions = {
    debug?: boolean;
    country?: string;
};
export declare enum MiCloudEvent {
    DEVICE_AVAILABLE = "device-available",
    LOGGED_IN = "logged-in",
    LOGGED_OUT = "logged-out",
    COUNTRY_CHANGED = "country-changed"
}
export default class MiCloud extends DeviceDiscover {
    onDeviceAvailable(callback: any): this;
    discoverDevices(): this;
    protected username: Nullable<string>;
    protected password: Nullable<string>;
    protected ssecurity: Nullable<string>;
    protected userID: Nullable<string>;
    protected serviceToken: Nullable<string>;
    protected agentID: string;
    protected userAgent: string;
    protected clientID: string;
    requestTimeout: number;
    country: string;
    availableCountries: string[];
    locale: string;
    protected logger: {
        deepDebug: (...args: any[]) => any;
        debug: (...args: any[]) => any;
    };
    constructor(options?: MiCloudConstructOptions);
    isLoggedIn(): boolean;
    setCountry(country?: AvailableCountry): void;
    setRequestTimeout(timeout?: number): void;
    login(username: string, password: string, country?: AvailableCountry): Promise<void>;
    logout(): void;
    refreshServiceToken(): void;
    request(path: string, data: Record<string, any>): Promise<any>;
    getDevices(deviceIds?: string[]): Promise<Device[]>;
    getDevice(deviceId: string): Promise<Device>;
    miioCall(deviceId: string, method: string, params: Record<string, any>): Promise<any>;
    miotGetProps(params: GetDevicePropertyOption[]): Promise<any>;
    miotSetProps(params: SetDevicePropertyOption[]): Promise<any>;
    miotAction(params: CallDeviceActionOption): Promise<any>;
    private _getApiUrl;
    private _parseJson;
    private _generateSignature;
    private _generateNonce;
    private _signedNonce;
    private _loginStep1;
    private _loginStep2;
    private _loginStep3;
}
export {};
