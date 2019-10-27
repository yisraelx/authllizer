import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IFacebookOAuth2Options extends IOAuth2ProviderOptions {
    display?: 'popup' | 'page';
}

/**
 * @resource https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
 */
export default class FacebookOAuth2 extends OAuth2Provider {

    static extend: (options: IFacebookOAuth2Options) => typeof FacebookOAuth2;

    name = 'facebook';
    authorizationEndpoint = 'https://www.facebook.com/v4.0/dialog/oauth';
    redirectUri = window.location.origin + '/';
    scopeParams = ['email'];
    scopeDelimiter = ',';
    displayOptions = { width: 580, height: 400 };

    dialogParams = ['display'];
    display: 'popup' | 'page' = 'popup';
}
