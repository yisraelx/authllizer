import { MemoryStorage, IMemoryStorageOptions } from './memory';
import { IStorage } from './storage';
import { IToken } from '../tokens/token';
import isFunction from '../utils/is-function';

export interface ICookieStorageOptions extends IMemoryStorageOptions {
    expire: () => (Date | number) | Date | number;
    path: string;
}

export class CookieStorage extends MemoryStorage implements IStorage {

    public expire: () => (Date | number) | Date | number;
    public path: string;

    constructor(options?: ICookieStorageOptions) {
        super(options);
    }

    public getToken(): string {
        let result;
        try {
            let items: string[] = document.cookie.split(';');
            let { length } = items;
            for (let i = 0; i < length; i++) {
                let [key, value] = items[i].split('=');
                if (key.trim() === this.key) {
                    result = value;
                    break;
                }
            }
        } catch (e) {
            result = super.getToken();
        }
        return result;
    }

    public setToken(token: IToken): void {
        let expire = token.expire || (isFunction(this.expire) ? this.expire() : this.expire);
        this._setToken(token, expire as any);
    }

    public removeToken(): void {
        this._setToken('', 0);
    }

    private _setToken(token: IToken | string, expire?: Date | number): void {
        try {
            document.cookie = [
                `${this.key}=${token}`,
                expire ? `expires=${new Date(expire as any).toUTCString()}` : '',
                this.path ? `path=${this.path}` : ''
            ].join(';');
        } catch (e) {
            super.setToken(token as IToken);
        }
    }
}
