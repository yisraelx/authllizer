import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IBitbucketOAuth2Options extends IOAuth2ProviderOptions {

}

/**
 * @resource https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html
 */
class BitbucketOAuth2 extends OAuth2Provider {

    static extend: (options: IBitbucketOAuth2Options) => typeof BitbucketOAuth2;

    name = 'bitbucket';
    authorizationEndpoint = 'https://bitbucket.org/site/oauth2/authorize';
    redirectUri = window.location.origin + '/';
    scopeParams = ['account', 'email'];
    scopeDelimiter = ' ';
    displayOptions = { width: 580, height: 400 };

    dialogParams = [];
}

export default BitbucketOAuth2;
