import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IYahooOAuth2Options extends IOAuth2ProviderOptions {
    language?: string;
}

/**
 * @resource https://developer.yahoo.com/oauth2/
 */
export default class YahooOAuth2 extends OAuth2Provider {
    static extend: (options: IYahooOAuth2Options) => typeof YahooOAuth2;

    name = 'yahoo';
    authorizationEndpoint = 'https://api.login.yahoo.com/oauth2/request_auth';
    redirectUri = window.location.origin;
    scopeParams = [];
    scopeDelimiter = ',';
    displayOptions = { width: 559, height: 519 };

    dialogParams = ['language'];
    language: string;
}
