import DeviceDiscover from '../protocal/device_discover';

import crypto from 'crypto';
import fetch from 'node-fetch';
import randomstring from 'randomstring';
import querystring from 'querystring';


type Nullable<T> = T | null;

const DEFAULT_REQUEST_TIMEOUT = 5000;

type IntBool = 0 | 1;

export interface Device {
  longitude: string | '0.00000000'
  latitude: string | '0.00000000'
  did: string
  token: string
  name: string
  pid: string | '0'
  localip: string
  mac: string
  ssid: string
  bssid: string
  parent_id: string | ''
  parent_model: string | ''
  show_mode: IntBool
  model: string
  adminFlag: IntBool
  shareFlag: IntBool
  permitLevel: number
  isOnline: boolean
  desc: string
  extra?: {
    isSetPincode?: IntBool
    pincodeType?: number
    fw_version?: string
    needVerifyCode?: IntBool
    isPasswordEncrypt?: IntBool,
    platform?: string | 'R2100' | 'R4A',
    mcu_version?: string
  },
  uid: number
  pd_id: number
  password: string | ''
  p2p_id: string | ''
  rssi: number // negative
  family_id: number | 0
  reset_flag: IntBool
  prop?: {
    [key: string]: any
  }
}

export type MiCloudConstructOptions = {
  debug?: boolean
  country?: string
}

export enum MiCloudEvent {
  DEVICE_AVAILABLE = 'device-available',
  LOGGED_IN = 'logged-in',
  LOGGED_OUT = 'logged-out',
  COUNTRY_CHANGED = 'country-changed'
}

export default class MiCloud extends DeviceDiscover {

  onDeviceAvailable(callback: any): this {
    throw new Error('Method not implemented.');
  }

  discoverDevices(): this {
      throw new Error('Method not implemented.');
  }

  protected username: Nullable<string> = null;
  protected password: Nullable<string> = null;
  protected ssecurity: Nullable<string> = null;
  protected userID: Nullable<string> = null;
  protected serviceToken: Nullable<string> = null;

  protected agentID: string;
  protected userAgent: string;
  protected clientID: string;

  public requestTimeout = DEFAULT_REQUEST_TIMEOUT;
  public country = 'cn';
  public availableCountries = ['ru', 'us', 'tw', 'sg', 'cn', 'de', 'in', 'i2']
  public locale = 'en';

  protected logger: {
    deepDebug: (...args: any[]) => any
    debug: (...args: any[]) => any
  }

  constructor(options?: MiCloudConstructOptions) {
    super();
    this.country = options?.country ?? this.country;

    this.logger = {
      deepDebug: options?.debug ? console.info : () => null,
      debug: options?.debug ? console.info : () => null,
    };

    // constants
    this.agentID = randomstring.generate({
      length: 13,
      charset: 'ABCDEF',
    });

    this.userAgent = `Android-7.1.1-1.0.0-ONEPLUS A3010-136-${this.agentID} APP/xiaomi.smarthome APPV/62830`;
    this.clientID = randomstring.generate({
      length: 6,
      charset: 'alphabetic',
      capitalization: 'uppercase',
    });
  }

  public isLoggedIn() {
    return !!this.serviceToken;
  }

  public setCountry(country: AvailableCountry = 'cn') {
    if (!this.availableCountries.includes(country)) {
      throw new Error(
        `The country ${country} is not supported, list of supported countries is ${this.availableCountries.join(', ')}`
      );
    }
    if (country != this.country) {
      this.country = country;
      this.emit(MiCloudEvent.COUNTRY_CHANGED, country);
    }
  }

  public setRequestTimeout(timeout = DEFAULT_REQUEST_TIMEOUT) {
    if (timeout < 2000) {
      timeout = 2000; // make sure we stay above 2000ms since those requests might take some time
    }
    this.requestTimeout = timeout;
  }

  public async login(username: string, password: string, country?: AvailableCountry) {
    if (country) {
      this.setCountry(country);
    }
    this.logger.debug(`Log in to MiCloud ${country} server with username ${username}. Request timeout: ${this.requestTimeout} milliseconds.`);
    if (this.isLoggedIn()) {
      throw new Error(`You are already logged in with username ${this.username}. Login not required!`);
    }
    const {
      sign
    } = await this._loginStep1();
    const {
      ssecurity,
      userId,
      location
    } = await this._loginStep2(username, password, sign);
    const {
      serviceToken
    } = await this._loginStep3(sign.indexOf('http') === -1 ? location : sign);
    this.username = username;
    this.password = password;
    this.ssecurity = ssecurity;
    this.userID = userId;
    this.serviceToken = serviceToken;
    this.emit(MiCloudEvent.LOGGED_IN);
  }

  public logout() {
    if (!this.isLoggedIn()) {
      throw new Error('You are not logged in! Cannot log out!');
    }
    this.logger.debug(`Logout from MiCloud for username ${this.username}`);
    this.username = null;
    this.password = null;
    this.ssecurity = null;
    this.userID = null;
    this.serviceToken = null;
    this.setCountry('cn');
    this.emit(MiCloudEvent.LOGGED_OUT);
  }

  public refreshServiceToken() {
    this.logger.debug(`Refreshing MiCloud service token for username ${this.username}`);
    this.ssecurity = null;
    this.userID = null;
    this.serviceToken = null;
    this.login(this.username!, this.password!);
  }

  public async request(path: string, data: Record<string, any>) {
    if (!this.isLoggedIn()) {
      throw new Error('You are not logged in! Cannot make a request!');
    }
    const url = this._getApiUrl(this.country) + path;
    const params = {
      data: JSON.stringify(data),
    };
    const nonce = this._generateNonce();
    const signedNonce = this._signedNonce(this.ssecurity!, nonce);
    const signature = this._generateSignature(path, signedNonce, nonce, params);
    const body = {
      _nonce: nonce,
      data: params.data,
      signature,
    };

    this.logger.deepDebug(`MiCloud request ${url} - ${JSON.stringify(body)}`);
    const res = await fetch(url, {
      method: 'POST',
      timeout: this.requestTimeout,
      headers: {
        'User-Agent': this.userAgent,
        'x-xiaomi-protocal-flag-cli': 'PROTOCAL-HTTP2',
        'mishop-client-id': '180100041079',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': [
          'sdkVersion=accountsdk-18.8.15',
          `deviceId=${this.clientID}`,
          `userId=${this.userID}`,
          `yetAnotherServiceToken=${this.serviceToken}`,
          `serviceToken=${this.serviceToken}`,
          `locale=${this.locale}`,
          'channel=MI_APP_STORE'
        ].join('; '),
      },
      body: querystring.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Request error with status ${res.status} ${res.statusText}`);
    }

    return await res.json();
  }

  public async getDevices(deviceIds?: string[]): Promise<Device[]> {
    const req = deviceIds ? {
      dids: deviceIds,
    } : {
      getVirtualModel: false,
      getHuamiDevices: 0,
    };
    const data = await this.request('/home/device_list', req);
    return data.result.list;
  }

  public async getDevice(deviceId: string): Promise<Device> {
    const req = {
      dids: [String(deviceId)]
    };
    const data = await this.request('/home/device_list', req);

    return data.result.list[0];
  }

  // this passes the commands to the specified device
  public async miioCall(deviceId: string, method: string, params: Record<string, any>) {
    const req = {
      method,
      params
    };
    const data = await this.request(`/home/rpc/${deviceId}`, req);
    return data.result;
  }

  // the below methods always use miot protocol even for old device which does not supprt it locally
  public async miotGetProps(params: GetDevicePropertyOption[]) {
    const req = {
      params
    };
    const data = await this.request(`/miotspec/prop/get`, req);
    return data.result;
  }

  public async miotSetProps(params: SetDevicePropertyOption[]) {
    const req = {
      params
    };
    const data = await this.request(`/miotspec/prop/set`, req);
    return data.result;
  }

  public async miotAction(params: CallDeviceActionOption) {
    const req = {
      params
    };
    const data = await this.request(`/miotspec/action`, req);
    return data.result;
  }

  // private stuff
  private _getApiUrl(country: string) {
    country = country.trim().toLowerCase();
    return `https://${country === 'cn' ? '' : `${country}.`}api.io.mi.com/app`;
  }

  private _parseJson(str: string) {
    if (str.indexOf('&&&START&&&') === 0) {
      str = str.replace('&&&START&&&', '');
    }
    return JSON.parse(str);
  }

  private _generateSignature(path: string, _signedNonce: string, nonce: string, params: Record<string, any>) {
    const exps = [];
    exps.push(path);
    exps.push(_signedNonce);
    exps.push(nonce);

    const paramKeys = Object.keys(params);
    paramKeys.sort();
    for (let i = 0, {
        length
      } = paramKeys; i < length; i++) {
      const key = paramKeys[i];
      exps.push(`${key}=${params[key]}`);
    }

    return crypto
      .createHmac('sha256', Buffer.from(_signedNonce, 'base64'))
      .update(exps.join('&'))
      .digest('base64');
  }

  private _generateNonce() {
    const buf = Buffer.allocUnsafe(12);
    buf.write(crypto.randomBytes(8).toString('hex'), 0, 'hex');
    buf.writeInt32BE(Math.ceil(Date.now() / 60000), 8);
    return buf.toString('base64');
  }

  private _signedNonce(ssecret: string, nonce: string) {
    const s = Buffer.from(ssecret, 'base64');
    const n = Buffer.from(nonce, 'base64');
    return crypto.createHash('sha256').update(s).update(n).digest('base64');
  }

  private async _loginStep1() {
    const url = 'https://account.xiaomi.com/pass/serviceLogin?sid=xiaomiio&_json=true';
    const res = await fetch(url);

    const content = await res.text();
    const {
      statusText
    } = res;
    this.logger.debug(`MiCloud - Login step 1`);
    this.logger.deepDebug(`MiCloud - Login step 1 result: ${statusText} - ${content}`);

    if (!res.ok) {
      throw new Error(`Response step 1 error with status ${statusText}`);
    }

    const data = this._parseJson(content);

    if (!data._sign) {
      throw new Error('Login step 1 failed');
    }

    return {
      sign: data._sign,
    };
  }

  private async _loginStep2(username: string, password: string, sign: string) {
    const formData = querystring.stringify({
      hash: crypto
        .createHash('md5')
        .update(password)
        .digest('hex')
        .toUpperCase(),
      _json: 'true',
      sid: 'xiaomiio',
      callback: 'https://sts.api.io.mi.com/sts',
      qs: '%3Fsid%3Dxiaomiio%26_json%3Dtrue',
      _sign: sign,
      user: username,
    });

    const url = 'https://account.xiaomi.com/pass/serviceLoginAuth2';
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': this.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: [
          'sdkVersion=accountsdk-18.8.15',
          `deviceId=${this.clientID};`
        ].join('; '),
      },
    });

    const content = await res.text();
    const {
      statusText
    } = res;
    this.logger.debug(`MiCloud - Login step 2`);
    this.logger.deepDebug(`MiCloud - Login step 2 result: ${statusText} - ${content}`);

    if (!res.ok) {
      throw new Error(`Response step 2 error with status ${statusText}`);
    }

    console.info(content);

    const {
      ssecurity,
      userId,
      location
    } = this._parseJson(content);

    if (!ssecurity || !userId || !location) {
      throw new Error('Login step 2 failed');
    }

    this.ssecurity = ssecurity; // Buffer.from(data.ssecurity, 'base64').toString('hex');
    this.userID = userId;
    return {
      ssecurity,
      userId,
      location,
    };
  }

  private async _loginStep3(location: string): Promise<{serviceToken: string}> {
    const url = location;
    const res = await fetch(url);

    const content = await res.text();
    const {
      statusText
    } = res;

    this.logger.debug(`MiCloud - Login step 3`);
    this.logger.deepDebug(`MiCloud - Login step 3 result: ${statusText} - ${content}`);

    if (!res.ok) {
      throw new Error(`Response step 3 error with status ${statusText}`);
    }

    const headers = res.headers.raw();
    const cookies = headers['set-cookie'];
    let serviceToken: string | null = null;
    cookies.find(cookieStr => {
      const cookie = cookieStr.split('; ')[0];
      const idx = cookie.indexOf('=');
      const key = cookie.substr(0, idx);
      const value = cookie.substr(idx + 1, cookie.length).trim();
      if (key === 'serviceToken') {
        serviceToken = value;
        return true;
      }
    });
    if (!serviceToken) {
      throw new Error('Login step 3 failed');
    }
    return { serviceToken };
  }

}
