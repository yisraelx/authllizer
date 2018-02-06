/**
 * @resource https://developer.linkedin.com/docs/oauth2
 */
import { OAuth2Provider, IOAuth2ProviderOptions } from '@authllizer/core';

export interface ILinkedinOAuth2Options extends IOAuth2ProviderOptions {

}

export default class LinkedinOAuth2 extends OAuth2Provider {

    static extend: (options: ILinkedinOAuth2Options) => typeof LinkedinOAuth2;

    name = 'linkedin';
    authorizationEndpoint = 'https://www.linkedin.com/oauth/v2/authorization';
    scopeDelimiter = ' ';
    displayOptions = { width: 527, height: 582 };

    redirectUri = window.location.origin;
    scopeParams = ['r_fullprofile', 'r_emailaddress'];

    dialogParams: string[] = [];
}
