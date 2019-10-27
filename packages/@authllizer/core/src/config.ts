import { IAdapter, IAdapterConstructor } from './adapters/adapter';
import { BackendAdapter } from './adapters/backend';
import { BrowserDialog } from './dialogs/browser';
import { IDialogConstructor } from './dialogs/dialog';
import { FetchHttpClient } from './http/fetch';
import { IHttpClient } from './http/http';

import { IDirectory } from './interface';
import { IProvider, IProviderConstructor } from './providers/provider';
import { LocalStorage } from './storages/local';
import { IStorage } from './storages/storage';
import { JWT } from './tokens/jwt';
import { ITokenConstructor } from './tokens/token';
import forEach from './utils/for-each';
import isFunction from './utils/is-function';
import isObject from './utils/is-object';
import isRegExp from './utils/is-regexp';
import isString from './utils/is-string';
import normalizeLocation from './utils/normalize-location';

export interface IConfigOptions {
    adapter?: IAdapterConstructor;
    dialog?: IDialogConstructor;
    httpClient?: IHttpClient;
    interceptList?: (string | RegExp)[];
    providers?: IDirectory<IProviderConstructor>;
    storage?: IStorage;
    token?: ITokenConstructor;
}

export class Config {

    protected _options: IDirectory<any> = {
        adapter: BackendAdapter,
        dialog: BrowserDialog,
        httpClient: new FetchHttpClient(),
        interceptList: [],
        storage: new LocalStorage(),
        token: JWT
    };

    public get adapter(): IAdapter {
        let { adapter: Adapter } = this._options;
        if (!isFunction(Adapter)) {
            throw new Error(`Config: 'adapter' is missing.`);
        }
        return new Adapter(this.httpClient);
    }

    public get dialog(): IDialogConstructor {
        let { dialog } = this._options;
        if (!isFunction(dialog)) {
            throw new Error(`Config: 'dialog' is missing.`);
        }
        return dialog;
    }

    public get httpClient(): IHttpClient {
        let { httpClient } = this._options;
        if (!isObject(httpClient)) {
            throw new Error(`Config: 'httpClient' is missing.`);
        }
        return httpClient;
    }

    public get interceptList(): (string | RegExp)[] {
        let { interceptList } = this._options;
        return interceptList || [];
    }

    public get storage(): IStorage {
        let { storage } = this._options;
        if (!isObject(storage)) {
            throw new Error(`Config: 'storage' is missing.`);
        }
        return storage;
    }

    public get token(): ITokenConstructor {
        let { token } = this._options;
        if (!isFunction(token)) {
            throw new Error(`Config: 'token' is missing.`);
        }
        return token;
    }

    constructor(options?: IConfigOptions) {
        this.setOptions(options);
    }

    public setOptions(options: IConfigOptions) {
        if (!isObject(options)) {
            return;
        }
        let { adapter, dialog, httpClient, interceptList, storage, token, providers } = options;
        if (adapter) {
            if (!isFunction(adapter)) {
                throw new Error(`Config: 'adapter' is invalid.`);
            }
            this._options.adapter = adapter;
        }

        if (dialog) {
            if (!isFunction(dialog)) {
                throw new Error(`Config: 'dialog' is  invalid.`);
            }
            this._options.dialog = dialog;
        }

        if (httpClient) {
            if (!isObject(httpClient)) {
                throw new Error(`Config: 'httpClient' is  invalid.`);
            }
            this._options.httpClient = httpClient;
        }

        if (interceptList) {
            if (!Array.isArray(interceptList)) {
                throw new Error(`Config: 'interceptList' is  invalid.`);
            }
            interceptList.forEach((compere) => {
                if (!isString(compere) && !isRegExp(compere)) {
                    throw new Error(`Config: 'interceptList' invalid compere ${ compere }`);
                }
            });
            this._options.interceptList = interceptList;
        }

        if (storage) {
            if (!isObject(storage)) {
                throw new Error(`Config: 'storage' is invalid.`);
            }
            this._options.storage = storage;
        }

        if (token) {
            if (!isFunction(token)) {
                throw new Error(`Config: 'token' is invalid.`);
            }
            this._options.token = token;
        }

        if (providers) {
            if (!isObject(providers)) {
                throw new Error(`Config: 'providers' is invalid.`);
            }
            if (!isObject(this._options.providers)) {
                this._options.providers = {};
            }
            forEach(providers, (provider, name) => {
                if (!isFunction(provider)) {
                    throw new Error(`Config: 'provider' '${ name }' is invalid.`);
                }
                this._options.providers[name] = provider;
            });
        }
    }

    public provider(provider: string): IProvider {
        let { providers } = this._options;

        if (!isString(provider) || !this.isProviderExists(provider)) {
            throw new Error(`Config: '${ provider }' provider is missing.`);
        }

        let Provider: IProviderConstructor = providers[provider];

        if (!isFunction(Provider)) {
            throw new Error(`Config: provider should be a class: ${ Provider }`);
        }

        return new Provider(this.adapter, this.dialog);
    }

    public isProviderExists(provider: string) {
        let { providers = {} } = this._options;
        return !!providers[provider];
    }

    public isUrlMatchInterceptList(url: string): boolean {
        let { interceptList } = this;
        let { length } = interceptList || [];
        if (!length) {
            return true;
        }

        for (let i = 0; i < length; i++) {
            let compereUrl = interceptList[i];
            if (isString(compereUrl)) {
                if (normalizeLocation(url) === normalizeLocation(compereUrl as string)) {
                    return true;
                }
            } else if (isRegExp(compereUrl)) {
                if ((compereUrl as RegExp).test(url)) {
                    return true;
                }
            }
        }

        return false;
    }

}
