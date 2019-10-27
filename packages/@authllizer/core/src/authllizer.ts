import { AdapterRequestType, IAdapterRequestOptions, IAdapterResponse } from './adapters/adapter';
import { Config, IConfigOptions } from './config';
import { IDirectory } from './interface';
import { IToken, ITokenConstructor } from './tokens/token';
import EventEmitter from './utils/event-emitter';
import extend from './utils/extend';
import isString from './utils/is-string';

export interface IAuthllizerOptions extends IConfigOptions {
    /**
     * if to use the Authllizer class instance or create new instance.
     * @default true
     */
    useClassInstance?: boolean;
}

export class Authllizer {

    static __instance: Authllizer;

    static get instance(): Authllizer {
        if (!this.__instance) {
            this.__instance = new Authllizer({ useClassInstance: false });
        }
        return this.__instance;
    }

    public onChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _config: Config = new Config;

    constructor(options: IAuthllizerOptions = {}) {

        if (options.useClassInstance !== false) {
            return Authllizer.instance.config(options);
        }

        this.config(options);
    }

    public config(options: IConfigOptions) {
        this._config.setOptions(options);
        return this;
    }

    public signIn<T>(data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.signIn,
            data,
            extractToken: true
        };

        return this._config.adapter.request<T>(options).then(({ response, token }: IAdapterResponse<T>) => {
            this.setToken(token);
            return response;
        });
    }

    public signUp<T>(data?: IDirectory<any>, signIn?: boolean): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.signUp,
            data,
            extractToken: signIn
        };

        return this._config.adapter.request<T>(options).then(({ response, token }: IAdapterResponse<T>) => {
            if (signIn) {
                this.setToken(token);
            }
            return response;
        });
    }

    public signOut<T>(data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.signOut,
            data,
            token: this.getToken()
        };

        return this._config.adapter.request<T>(options).then(({ response }: IAdapterResponse<T>) => {
            this.removeToken();
            return response;
        });
    }

    public authenticate<T>(provider: string, data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.authenticate,
            data,
            extractToken: true,
            provider
        };

        return this
            ._config
            .provider(provider)
            .authenticate<T>(options)
            .then(({ response, token }: IAdapterResponse<T>) => {
                this.setToken(token);
                return response;
            });
    }

    public link<T>(provider: string, data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.link,
            data,
            token: this.getToken(),
            provider
        };

        return this._config
            .provider(provider)
            .authenticate<T>(options)
            .then(({ response }: IAdapterResponse<T>) => response);
    }

    public unlink<T>(provider: string, data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.unlink,
            data: extend({ provider }, data),
            token: this.getToken()
        };

        return this
            ._config
            .adapter
            .request<T>(options)
            .then(({ response }: IAdapterResponse<T>) => response);
    }

    public refresh<T>(data?: IDirectory<any>): Promise<T> {
        let options: IAdapterRequestOptions = {
            type: AdapterRequestType.refresh,
            data,
            token: this.getToken(),
            extractToken: true
        };

        return this
            ._config
            .adapter
            .request<T>(options)
            .then(({ token, response }: IAdapterResponse<T>) => {
                this.setToken(token);
                return response;
            });
    }

    public isAuthenticated(): boolean {
        let token: IToken = this.getToken();
        return token ? token.isValid() : false;
    }

    public getToken<T extends IToken>(): T {
        let token: string = this._config.storage.getToken();
        let Token: ITokenConstructor = this._config.token;
        let tokenObject;
        try {
            tokenObject = new Token(token);
        } catch {
        }

        return tokenObject;
    }

    public setToken(token: string | IToken): void {

        if (isString(token)) {
            let Token: ITokenConstructor = this._config.token;
            token = new Token(token);
        }

        this._config.storage.setToken(token as IToken);
        this.onChange.emit(true);
    }

    public removeToken(): void {
        this._config.storage.removeToken();
        this.onChange.emit(false);
    }

    /**
     * for easily create intercepts, checking if necessary to intercept
     * this method checks to see if there is an authenticated user and if there is a match in config.interceptList
     * @param {string} url - url to check
     * @returns {boolean} - if need to intercept
     */
    public toIntercept(url: string): boolean {
        return this.isAuthenticated() && this._config.isUrlMatchInterceptList(url);
    }

}
