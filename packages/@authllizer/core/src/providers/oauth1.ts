import { IAdapterRequestOptions, IAdapterResponse } from '../adapters/adapter';
import extend from '../utils/extend';
import stringifyQuery from '../utils/stringify-query';
import { BaseProvider, IBaseProviderOptions } from './base';
import { IProvider } from './provider';

export interface IOAuth1ProviderOptions extends IBaseProviderOptions {
    requestTokenParams?: {
        redirectUri?: string;
        [key: string]: string;
    };
    authenticateParams?: {
        redirectUri?: string;
        oauth_token?: string;
        oauth_verifier?: string;
        [key: string]: string;
    };
}

export interface IOAuth1RequestTokenResponse {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed: string;
}

export interface IOAuth1DialogResponse {
    oauth_token: string;
    oauth_verifier: string;
}

/**
 * @resource https://tools.ietf.org/html/rfc5849
 */
export class OAuth1Provider extends BaseProvider implements IProvider {

    static extend: (options: IOAuth1ProviderOptions) => typeof OAuth1Provider;

    protected requestTokenParams: {
        redirectUri: string;
        [key: string]: string;
    } = {
        redirectUri: 'callback'
    };

    protected authenticateParams: {
        redirectUri: string;
        oauth_token: string;
        oauth_verifier: string;
        [key: string]: string;
    } = {
        redirectUri: 'callback',
        oauth_token: 'oauth_token',
        oauth_verifier: 'oauth_verifier'
    };

    public authenticate<R>(requestOptions?: IAdapterRequestOptions): Promise<IAdapterResponse<R>> {
        return this
            .getRequestToken(requestOptions)
            .then((requestTokenResponse: IOAuth1RequestTokenResponse) => {
                return this
                    .getPermissions(requestTokenResponse)
                    .then((dialogResponse: IOAuth1DialogResponse) => {
                        return this.getAccessToken<R>(dialogResponse, requestOptions);
                    });
            });
    }

    protected getRequestToken({ provider, type, token }: IAdapterRequestOptions): Promise<IOAuth1RequestTokenResponse> {
        let { requestTokenParams } = this;
        let data = this.prepareData(requestTokenParams);
        let options: IAdapterRequestOptions = {
            type,
            data,
            provider,
            token
        };

        return this
            ._adapter
            .request<IOAuth1RequestTokenResponse>(options)
            .then(({ response }: IAdapterResponse<IOAuth1RequestTokenResponse>) => response);
    }

    protected getPermissions(requestTokenResponse: IOAuth1RequestTokenResponse): Promise<IOAuth1DialogResponse> {
        let query = stringifyQuery(requestTokenResponse, { delimiter: '&' });
        let url = [this.authorizationEndpoint, query].join('?');

        return this.openDialog<IOAuth1DialogResponse>(url);
    }

    protected getAccessToken<R>(oauthData: IOAuth1DialogResponse, requestOptions: IAdapterRequestOptions): Promise<IAdapterResponse<R>> {
        let { authenticateParams } = this;
        let data = this.prepareData(authenticateParams, oauthData);
        requestOptions.data = extend(data, requestOptions.data);

        return this._adapter.request<R>(requestOptions);
    }

}
