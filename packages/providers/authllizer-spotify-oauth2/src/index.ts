/**
 * @resource https://developer.spotify.com/web-api/authorization-guide/
 */
import { OAuth2Provider, IOAuth2ProviderOptions } from '@authllizer/core';

export interface ISpotifyOAuth2Options extends IOAuth2ProviderOptions {

}

export default class SpotifyOAuth2 extends OAuth2Provider {

    static extend: (options: ISpotifyOAuth2Options) => typeof SpotifyOAuth2;

    name = 'spotify';
    authorizationEndpoint = 'https://accounts.spotify.com/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['user-read-email'];
    scopeDelimiter = ' ';
    displayOptions = {width: 500, height: 530};

    dialogParams = ['show_dialog'];
    showDialog: boolean;
}
