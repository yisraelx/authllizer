import { IOAuth1ProviderOptions, OAuth1Provider } from '@authllizer/core';

export interface ITwitterOAuth1Options extends IOAuth1ProviderOptions {

}

/**
 * @resource https://dev.twitter.com/web/sign-in/implementing
 */
export default class TwitterOAuth1 extends OAuth1Provider {

    static extend: (options: ITwitterOAuth1Options) => typeof TwitterOAuth1;

    name = 'twitter';
    authorizationEndpoint = 'https://api.twitter.com/oauth/authenticate';
    redirectUri = window.location.origin;
    displayOptions = { width: 495, height: 645 };
}
