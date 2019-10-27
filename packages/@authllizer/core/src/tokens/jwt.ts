/**
 * @resource https://tools.ietf.org/html/rfc7519
 */
import decodeBase64 from '../utils/decode-base64';
import isString from '../utils/is-string';
import { IToken } from './token';

export interface IJWTPayload {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    nbf?: string;
    iat?: number;
    jti?: string;

    [key: string]: any;
}

export class JWT implements IToken {

    static JWT_RX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    static parse(token: string): IJWTPayload {
        if (!isString(token) || !this.JWT_RX.test(token)) {
            throw new Error('Token is invalid or missing.');
        }
        let [, base64Url] = token.split('.');
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeBase64(base64));
    }

    protected headerPrefix: string = 'Bearer';
    private _token: string;
    private _payload: IJWTPayload;

    public get expire(): Date {
        let { exp } = this._payload;
        return new Date(exp * 1000);
    }

    constructor(token: string | JWT) {
        this._token = String(token);
        this._payload = JWT.parse(this._token);
    }

    public getPayload(): IJWTPayload {
        return this._payload;
    }

    public isExpired(): boolean {
        return new Date() > this.expire;
    }

    public isValid(): boolean {
        return !this.isExpired();
    }

    public toHeader(): string {
        return `${ this.headerPrefix } ${ this._token }`;
    }

    public toString(): string {
        return this._token;
    }

    public toJSON(): IJWTPayload {
        return this._payload;
    }
}
