import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface ILiveOAuth2Options extends IOAuth2ProviderOptions {
    display?: 'page' | 'popup' | 'touch' | 'none';
    locale?: string;
}

/**
 * @resource https://msdn.microsoft.com/en-us/library/hh243647.aspx
 * @resource https://msdn.microsoft.com/en-us/library/hh243646.aspx
 */
export default class LiveOAuth2 extends OAuth2Provider {

    static extend: (options: ILiveOAuth2Options) => typeof LiveOAuth2;

    name = 'live';
    authorizationEndpoint = 'https://login.live.com/oauth20_authorize.srf';
    redirectUri = window.location.origin;
    scopeParams = ['wl.basic', 'wl.emails'];
    scopeDelimiter = ' ';
    displayOptions = { width: 500, height: 560 };

    dialogParams = ['display', 'locale'];
    display: 'page' | 'popup' | 'touch' | 'none' = 'popup';
    locale: string;
}
