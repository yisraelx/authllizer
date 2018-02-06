/**
 * @resource https://github.com/reddit/reddit/wiki/OAuth2
 * @resource https://www.reddit.com/dev/api/oauth
 */
import {OAuth2Provider, IOAuth2ProviderOptions} from '@authllizer/core';

export interface IRedditOAuth2Options extends IOAuth2ProviderOptions {
    duration?: 'temporary' | 'permanent';
}

export default class RedditOAuth2 extends OAuth2Provider {

    static extend: (options: IRedditOAuth2Options) => typeof RedditOAuth2;

    name = 'reddit';
    authorizationEndpoint = 'https://www.reddit.com/api/v1/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['identity'];
    scopeDelimiter = ',';
    displayOptions = { width: 840, height: 640 };

    dialogParams: string[] = ['duration'];
    duration: 'temporary' | 'permanent'; // default is 'temporary'
}
