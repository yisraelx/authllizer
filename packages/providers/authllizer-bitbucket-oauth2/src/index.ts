/**
 * @resource https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html
 */
import {OAuth2Provider, IOAuth2ProviderOptions} from '@authllizer/core';

export interface IBitbuckeOAuth2Options extends IOAuth2ProviderOptions {

}

class BitbucketOAuth2 extends OAuth2Provider {

    static extend: (options: IBitbuckeOAuth2Options) => typeof BitbucketOAuth2;

    name = 'bitbucket';
    authorizationEndpoint = 'https://bitbucket.org/site/oauth2/authorize';
    redirectUri = window.location.origin + '/';
    scopeParams = ['account', 'email'];
    scopeDelimiter = ' ';
    displayOptions = {width: 580, height: 400};

    dialogParams = [];
}

export default BitbucketOAuth2;
