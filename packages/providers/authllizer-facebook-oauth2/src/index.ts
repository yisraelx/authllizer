/**
 * @resource https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
 */
import {OAuth2Provider, IOAuth2ProviderOptions} from '@authllizer/core';

export interface FacebookOAuth2Options extends IOAuth2ProviderOptions {
    display?: 'popup' | 'page';
}

export default class FacebookOAuth2 extends OAuth2Provider {

    static extend: (options: FacebookOAuth2Options) => typeof FacebookOAuth2;

    name = 'facebook';
    authorizationEndpoint = 'https://www.facebook.com/v2.11/dialog/oauth';
    redirectUri = window.location.origin + '/';
    scopeParams = ['public_profile', 'email'];
    scopeDelimiter = ',';
    displayOptions = {width: 580, height: 400};

    dialogParams = ['display'];
    display: 'popup' | 'page' = 'popup';
}
