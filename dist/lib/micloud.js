"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiCloudEvent = void 0;
const device_discover_1 = __importDefault(require("../protocal/device_discover"));
const crypto_1 = __importDefault(require("crypto"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const randomstring_1 = __importDefault(require("randomstring"));
const querystring_1 = __importDefault(require("querystring"));
const DEFAULT_REQUEST_TIMEOUT = 5000;
var MiCloudEvent;
(function (MiCloudEvent) {
    MiCloudEvent["DEVICE_AVAILABLE"] = "device-available";
    MiCloudEvent["LOGGED_IN"] = "logged-in";
    MiCloudEvent["LOGGED_OUT"] = "logged-out";
    MiCloudEvent["COUNTRY_CHANGED"] = "country-changed";
})(MiCloudEvent || (exports.MiCloudEvent = MiCloudEvent = {}));
class MiCloud extends device_discover_1.default {
    onDeviceAvailable(callback) {
        throw new Error('Method not implemented.');
    }
    discoverDevices() {
        throw new Error('Method not implemented.');
    }
    constructor(options) {
        var _a;
        super();
        this.username = null;
        this.password = null;
        this.ssecurity = null;
        this.userID = null;
        this.serviceToken = null;
        this.requestTimeout = DEFAULT_REQUEST_TIMEOUT;
        this.country = 'cn';
        this.availableCountries = ['ru', 'us', 'tw', 'sg', 'cn', 'de', 'in', 'i2'];
        this.locale = 'en';
        this.country = (_a = options === null || options === void 0 ? void 0 : options.country) !== null && _a !== void 0 ? _a : this.country;
        this.logger = {
            deepDebug: (options === null || options === void 0 ? void 0 : options.debug) ? console.info : () => null,
            debug: (options === null || options === void 0 ? void 0 : options.debug) ? console.info : () => null,
        };
        // constants
        this.agentID = randomstring_1.default.generate({
            length: 13,
            charset: 'ABCDEF',
        });
        this.userAgent = `Android-7.1.1-1.0.0-ONEPLUS A3010-136-${this.agentID} APP/xiaomi.smarthome APPV/62830`;
        this.clientID = randomstring_1.default.generate({
            length: 6,
            charset: 'alphabetic',
            capitalization: 'uppercase',
        });
    }
    isLoggedIn() {
        return !!this.serviceToken;
    }
    setCountry(country = 'cn') {
        if (!this.availableCountries.includes(country)) {
            throw new Error(`The country ${country} is not supported, list of supported countries is ${this.availableCountries.join(', ')}`);
        }
        if (country != this.country) {
            this.country = country;
            this.emit(MiCloudEvent.COUNTRY_CHANGED, country);
        }
    }
    setRequestTimeout(timeout = DEFAULT_REQUEST_TIMEOUT) {
        if (timeout < 2000) {
            timeout = 2000; // make sure we stay above 2000ms since those requests might take some time
        }
        this.requestTimeout = timeout;
    }
    async login(username, password, country) {
        if (country) {
            this.setCountry(country);
        }
        this.logger.debug(`Log in to MiCloud ${country} server with username ${username}. Request timeout: ${this.requestTimeout} milliseconds.`);
        if (this.isLoggedIn()) {
            throw new Error(`You are already logged in with username ${this.username}. Login not required!`);
        }
        const { sign } = await this._loginStep1();
        const { ssecurity, userId, location } = await this._loginStep2(username, password, sign);
        const { serviceToken } = await this._loginStep3(sign.indexOf('http') === -1 ? location : sign);
        this.username = username;
        this.password = password;
        this.ssecurity = ssecurity;
        this.userID = userId;
        this.serviceToken = serviceToken;
        this.emit(MiCloudEvent.LOGGED_IN);
    }
    logout() {
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
    refreshServiceToken() {
        this.logger.debug(`Refreshing MiCloud service token for username ${this.username}`);
        this.ssecurity = null;
        this.userID = null;
        this.serviceToken = null;
        this.login(this.username, this.password);
    }
    async request(path, data) {
        if (!this.isLoggedIn()) {
            throw new Error('You are not logged in! Cannot make a request!');
        }
        const url = this._getApiUrl(this.country) + path;
        const params = {
            data: JSON.stringify(data),
        };
        const nonce = this._generateNonce();
        const signedNonce = this._signedNonce(this.ssecurity, nonce);
        const signature = this._generateSignature(path, signedNonce, nonce, params);
        const body = {
            _nonce: nonce,
            data: params.data,
            signature,
        };
        this.logger.deepDebug(`MiCloud request ${url} - ${JSON.stringify(body)}`);
        const res = await (0, node_fetch_1.default)(url, {
            method: 'POST',
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
            body: querystring_1.default.stringify(body),
        });
        if (!res.ok) {
            throw new Error(`Request error with status ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    async getDevices(deviceIds) {
        const req = deviceIds ? {
            dids: deviceIds,
        } : {
            getVirtualModel: false,
            getHuamiDevices: 0,
        };
        const data = await this.request('/home/device_list', req);
        return data.result.list;
    }
    async getDevice(deviceId) {
        const req = {
            dids: [String(deviceId)]
        };
        const data = await this.request('/home/device_list', req);
        return data.result.list[0];
    }
    // this passes the commands to the specified device
    async miioCall(deviceId, method, params) {
        const req = {
            method,
            params
        };
        const data = await this.request(`/home/rpc/${deviceId}`, req);
        return data.result;
    }
    // the below methods always use miot protocol even for old device which does not supprt it locally
    async miotGetProps(params) {
        const req = {
            params
        };
        const data = await this.request(`/miotspec/prop/get`, req);
        return data.result;
    }
    async miotSetProps(params) {
        const req = {
            params
        };
        const data = await this.request(`/miotspec/prop/set`, req);
        return data.result;
    }
    async miotAction(params) {
        const req = {
            params
        };
        const data = await this.request(`/miotspec/action`, req);
        return data.result;
    }
    // private stuff
    _getApiUrl(country) {
        country = country.trim().toLowerCase();
        return `https://${country === 'cn' ? '' : `${country}.`}api.io.mi.com/app`;
    }
    _parseJson(str) {
        if (str.indexOf('&&&START&&&') === 0) {
            str = str.replace('&&&START&&&', '');
        }
        return JSON.parse(str);
    }
    _generateSignature(path, _signedNonce, nonce, params) {
        const exps = [];
        exps.push(path);
        exps.push(_signedNonce);
        exps.push(nonce);
        const paramKeys = Object.keys(params);
        paramKeys.sort();
        for (let i = 0, { length } = paramKeys; i < length; i++) {
            const key = paramKeys[i];
            exps.push(`${key}=${params[key]}`);
        }
        return crypto_1.default
            .createHmac('sha256', Buffer.from(_signedNonce, 'base64'))
            .update(exps.join('&'))
            .digest('base64');
    }
    _generateNonce() {
        const buf = Buffer.allocUnsafe(12);
        buf.write(crypto_1.default.randomBytes(8).toString('hex'), 0, 'hex');
        buf.writeInt32BE(Math.ceil(Date.now() / 60000), 8);
        return buf.toString('base64');
    }
    _signedNonce(ssecret, nonce) {
        const s = Buffer.from(ssecret, 'base64');
        const n = Buffer.from(nonce, 'base64');
        return crypto_1.default.createHash('sha256').update(s).update(n).digest('base64');
    }
    async _loginStep1() {
        const url = 'https://account.xiaomi.com/pass/serviceLogin?sid=xiaomiio&_json=true';
        const res = await (0, node_fetch_1.default)(url);
        const content = await res.text();
        const { statusText } = res;
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
    async _loginStep2(username, password, sign) {
        const formData = querystring_1.default.stringify({
            hash: crypto_1.default
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
        const res = await (0, node_fetch_1.default)(url, {
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
        const { statusText } = res;
        this.logger.debug(`MiCloud - Login step 2`);
        this.logger.deepDebug(`MiCloud - Login step 2 result: ${statusText} - ${content}`);
        if (!res.ok) {
            throw new Error(`Response step 2 error with status ${statusText}`);
        }
        console.info(content);
        const { ssecurity, userId, location } = this._parseJson(content);
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
    async _loginStep3(location) {
        const url = location;
        const res = await (0, node_fetch_1.default)(url);
        const content = await res.text();
        const { statusText } = res;
        this.logger.debug(`MiCloud - Login step 3`);
        this.logger.deepDebug(`MiCloud - Login step 3 result: ${statusText} - ${content}`);
        if (!res.ok) {
            throw new Error(`Response step 3 error with status ${statusText}`);
        }
        const headers = res.headers.raw();
        const cookies = headers['set-cookie'];
        let serviceToken = null;
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
exports.default = MiCloud;
