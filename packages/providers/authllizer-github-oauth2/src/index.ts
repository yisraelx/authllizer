import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IGithubOAuth2Options extends IOAuth2ProviderOptions {
    allowSignup?: boolean;
}

/**
 * @resource https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/
 */
export default class GithubOAuth2 extends OAuth2Provider {

    static extend: (options: IGithubOAuth2Options) => typeof GithubOAuth2;

    name = 'github';
    authorizationEndpoint = 'https://github.com/login/oauth/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['user:email'];
    scopeDelimiter = ' ';
    displayOptions = { width: 1020, height: 618 };

    dialogParams = ['allow_signup'];
    allowSignup: boolean; // default true
}
