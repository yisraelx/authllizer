import extend from '../utils/extend';
import { IStorage } from './storage';
import { IToken } from '../tokens/token';

export interface IMemoryStorageOptions {
    key?: string;
}

export class MemoryStorage implements IStorage {

    public key: string = 'access_token';

    private _storage = {};

    constructor(options: IMemoryStorageOptions = {}) {
        extend(this, options);
    }

    public getToken(): string {
        let { key } = this;
        return this._storage[key];
    }

    public setToken(token: IToken): void {
        let { key } = this;
        this._storage[key] = token;
    }

    public removeToken(): void {
        let { key } = this;
        delete this._storage[key];
    }
}
