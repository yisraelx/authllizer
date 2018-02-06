/**
 * @resource https://dev.twitch.tv/docs/authentication
 */
import { OAuth2Provider, IOAuth2ProviderOptions } from '@authllizer/core';

export interface ITwitchOAuth2Options extends IOAuth2ProviderOptions {

}

export default class TwitchOAuth2 extends OAuth2Provider {

    static extend: (options: ITwitchOAuth2Options) => typeof TwitchOAuth2;

    name = 'twitch';
    authorizationEndpoint = 'https://api.twitch.tv/kraken/oauth2/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['user_read'];
    scopeDelimiter = ' ';
    displayOptions = { width: 500, height: 560 };

    dialogParams = [];
}
