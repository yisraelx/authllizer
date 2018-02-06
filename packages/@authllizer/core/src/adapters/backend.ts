import merge from '../utils/merge';
import extendClass from '../utils/extend-class';
import isString from '../utils/is-string';
import get from '../utils/get';
import joinUrl from '../utils/join-url';
import {IAdapter, IAdapterResponse, IAdapterRequestOptions} from './adapter';
import {Directory} from '../interface';
import {IHttpClient, IHttpRequestOptions} from '../http/http';

export interface IBackendAdapterOptions {

    baseUrl?: string;
    signIn?: string | IBackendRouteOptions;
    signOut?: string | IBackendRouteOptions;
    signUp?: string | IBackendRouteOptions;
    authenticate?: string | IBackendRouteOptions;
    link?: string | IBackendRouteOptions;
    unlink?: string | IBackendRouteOptions;
    refresh?: string | IBackendRouteOptions;

    /**
     * default config for the http requests
     */
    defaultHttpOptions?: IHttpRequestOptions;
    /**
     * for 'authenticate' and 'link' request (if false it will put the provider name in the data)
     * @default true
     */
    providerInUrl?: boolean;

    extractToken?: (response?: any) => string;

    /**
     * the path of the token in the response for extrcting the token from the response
     * @default 'access_token'
     */
    tokenPath?: string;
}

export interface IBackendRouteOptions {
    url?: string;
    httpOptions?: IHttpRequestOptions;
}

export class BackendAdapter implements IAdapter {

    static extend: (options: IBackendAdapterOptions) => typeof BackendAdapter = extendClass;

    protected baseUrl: string = '/auth';

    protected signIn: string | IBackendRouteOptions = '/signin';
    protected signOut: string | IBackendRouteOptions = '/signout';
    protected signUp: string | IBackendRouteOptions = '/signup';
    protected authenticate: string | IBackendRouteOptions = '';
    protected link: string | IBackendRouteOptions = '';
    protected unlink: string | IBackendRouteOptions = '/unlink';
    protected refresh: string | IBackendRouteOptions = '/refresh';

    protected defaultHttpOptions: IHttpRequestOptions = {
        method: 'POST',
        data: {},
        params: {},
        headers: {},
        withCredentials: false
    };

    protected providerInUrl: boolean = true;

    protected tokenPath: string = 'access_token';

    private _httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this._httpClient = httpClient;
    }

    public request<T>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<T>> {
        let {extractToken} = requestOptions;
        let stateOptions: IBackendRouteOptions = this.getDefaultRouteOptions(requestOptions);
        let url: string = this.prepareUrl(requestOptions, stateOptions);
        let httpOptions: IHttpRequestOptions = this.prepareOptions(requestOptions, stateOptions);

        return this._httpClient.request<T>(url, httpOptions).then((response: T) => {
            let adapterResponse: IAdapterResponse<T> = {response};
            if (extractToken) {
                adapterResponse.token = this.extractToken(response);
            }
            return adapterResponse;
        });
    }

    protected prepareUrl({provider}: IAdapterRequestOptions, {url}: IBackendRouteOptions): string {
        if (provider && this.providerInUrl) {
            url = joinUrl(url, provider);
        }

        return this.baseUrl ? joinUrl(this.baseUrl, url) : url;
    }

    protected prepareOptions({token, provider, data}: IAdapterRequestOptions, {httpOptions: routeHttpOptions}: IBackendRouteOptions): IHttpRequestOptions {
        let {defaultHttpOptions, providerInUrl} = this;

        let options = {
            data: {},
            params: {},
            headers: {}
        };

        if (provider && !providerInUrl) {
            data['provider'] = provider;
        }

        if (token) {
            options.headers['Authorization'] = token.toHeader();
        }

        let extendOptions: IHttpRequestOptions = merge({
            data: {},
            params: {},
            headers: {}
        }, defaultHttpOptions, routeHttpOptions, options);

        extendOptions.method = isString(extendOptions.method) ? extendOptions.method.toUpperCase() : 'POST';

        return this.prepareData(extendOptions, data);
    }

    protected getDefaultRouteOptions({type}: IAdapterRequestOptions): IBackendRouteOptions {
        let options: IBackendRouteOptions = isString(this[type]) ? {url: (this[type] as string)} : (this[type] as IBackendRouteOptions) || {};
        options.url = isString(options.url) ? options.url : `/${type}`;

        return options;
    }

    protected prepareData(httpOptions: IHttpRequestOptions, data?: Directory<any>): IHttpRequestOptions {
        let {method} = httpOptions;

        enum BODY_METHOD {
            POST,
            PUT,
            PATCH
        }

        if (method in BODY_METHOD) {
            merge(httpOptions.data, data);
            // remove data if data empty
            if (httpOptions.data && !Object.keys(httpOptions.data).length) {
                delete httpOptions.data;
            }
        } else {
            merge(httpOptions.params, httpOptions.data, data);
            delete httpOptions.data;
        }

        return httpOptions;
    }

    protected extractToken(response: any): string {
        let {tokenPath} = this;
        return get(response, tokenPath);
    }

}
