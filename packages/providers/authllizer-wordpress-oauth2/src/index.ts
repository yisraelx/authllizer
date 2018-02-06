/**
 * @resource https://developer.wordpress.com/docs/oauth2/
 */
import { OAuth2Provider, IOAuth2ProviderOptions } from '@authllizer/core';

export interface IWordpressOAuth2Options extends IOAuth2ProviderOptions {
    blog?: number;
}

export default class WordpressOAuth2 extends OAuth2Provider {

    static extend: (options: IWordpressOAuth2Options) => typeof WordpressOAuth2;

    name = 'wordpress';
    authorizationEndpoint = 'https://public-api.wordpress.com/oauth2/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['global'];
    scopeDelimiter = ' ';
    displayOptions =  {width: 900, height: 450};

    dialogParams: string[] = ['blog'];
    blog: number;
}
