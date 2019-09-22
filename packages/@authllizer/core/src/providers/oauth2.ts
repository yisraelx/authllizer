/**
 * @resource https://tools.ietf.org/html/rfc6749
 */
import extend from '../utils/extend';
import forEach from '../utils/for-each';
import randomString from '../utils/random-string';
import camelCase from '../utils/camel-case';
import { BaseProvider, IBaseProviderOptions } from './base';
import { IAdapterResponse, IAdapterRequestOptions } from '../adapters/adapter';
import { IProvider } from './provider';

export interface IOAuth2CodeDialogResponse {
    code: string;
    state: string;
}

export interface IOAuth2TokenDialogResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    state: string;
}


export interface IOAuth2ProviderOptions extends IBaseProviderOptions {
    clientId?: string;
    responseType?: 'code' | 'token';
    scopeDelimiter?: string;
    scopeParams?: string[];
    scopePrefix?: string;
    /**
     * the default is random string
     */
    state?: string;
    baseDialogParams?: string[];
    dialogParams?: string[];
    authenticateParams?: {
        code: string,
        clientId: string,
        redirectUri: string,
        [key: string]: string
    };
}

export class OAuth2Provider extends BaseProvider implements IProvider {

    static extend: (options: IOAuth2ProviderOptions) => typeof OAuth2Provider;

    protected get scope(): string {
        let { scopeParams = [], scopePrefix, scopeDelimiter } = this;
        let stringScope: string = scopeParams.join(scopeDelimiter);
        if (stringScope === '') { return void 0 as any; }
        return scopePrefix ? [scopePrefix, stringScope].join(scopeDelimiter) : stringScope;
    }

    protected clientId: string;
    protected responseType: 'code' | 'token' = 'code';
    protected scopeDelimiter: string;
    protected scopeParams: string[];
    protected scopePrefix: string;

    protected state: string;
    protected baseDialogParams: string[] = ['client_id', 'scope', 'state', 'redirect_uri', 'response_type'];
    protected dialogParams: string[];
    protected authenticateParams: {
        code: string,
        clientId: string,
        redirectUri: string,
        [key: string]: string
    } = {
        code: 'code',
        clientId: 'client_id',
        redirectUri: 'redirect_uri'
    };

    public authenticate<R>(requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>> {
        this.state = this.state || randomString();

        return this.getPermissions().then((dialogResponse: IOAuth2CodeDialogResponse | IOAuth2TokenDialogResponse) => {
            return this.getAccessToken<R>(dialogResponse, requestOptions);
        });
    }

    protected getPermissions(): Promise<IOAuth2CodeDialogResponse | IOAuth2TokenDialogResponse> {
        let { baseDialogParams, dialogParams } = this;
        let keys = [].concat(baseDialogParams || [], dialogParams || []);
        let params: string[] = [];

        forEach(keys, (key: string) => {
            let camelKey = camelCase(key) as keyof this;
            let value: this[keyof this] = this[camelKey];
            if (value != void 0) { params.push(`${key}=${value}`); }
        });

        let query = params.join('&');
        let url = [this.authorizationEndpoint, query].join('?');

        return this.openDialog<IOAuth2CodeDialogResponse | IOAuth2TokenDialogResponse>(url);
    }

    public getAccessToken<R>(oauthData: IOAuth2CodeDialogResponse | IOAuth2TokenDialogResponse, requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>> {
        if (this.state && oauthData.state !== this.state) {
            return Config.Promise.reject(new Error('The value returned in the state parameter does not match the state value from your original authorization code request.'));
        }

        if (this.responseType === 'token') {
            let token = (oauthData as IOAuth2TokenDialogResponse).access_token;
            return Promise.resolve({ token, response: oauthData } as any);
        }

        let { authenticateParams } = this;
        let data = this.prepareData(authenticateParams, oauthData);
        requestOptions.data = extend(data, requestOptions.data);
        return this._adapter.request<R>(requestOptions);
    }
}
