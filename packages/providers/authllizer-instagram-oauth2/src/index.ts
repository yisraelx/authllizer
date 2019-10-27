import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IInstagramOAuth2Options extends IOAuth2ProviderOptions {

}

/**
 * @resource https://www.instagram.com/developer/authentication/
 * @resource https://www.instagram.com/developer/authorization/
 */
export default class InstagramOAuth2 extends OAuth2Provider {

    static extend: (options: IInstagramOAuth2Options) => typeof OAuth2Provider;

    name = 'instagram';
    authorizationEndpoint = 'https://api.instagram.com/oauth/authorize/';
    redirectUri = window.location.origin;
    scopeParams = ['basic'];
    scopeDelimiter = '+';
    displayOptions = { width: 700, height: 500 };

    dialogParams: string[] = [];
}
