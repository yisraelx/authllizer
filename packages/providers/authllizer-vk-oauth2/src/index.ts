/**
 * @resource https://vk.com/dev/authentication
 */
import { OAuth2Provider, IOAuth2ProviderOptions } from '@authllizer/core';

export interface IVkOAuth2Options extends IOAuth2ProviderOptions {
    display?: 'page' | 'popup' | 'touch' | 'wap';
    v?: string;
}

export default class VkOAuth2 extends OAuth2Provider {

    static extend: (options: IVkOAuth2Options) => typeof VkOAuth2;

    name = 'vk';
    authorizationEndpoint = 'https://oauth.vk.com/authorize';
    redirectUri = window.location.origin;
    scopeParams = ['email'];
    scopeDelimiter = ' ';
    displayOptions = { width: 800, height: 600 };

    dialogParams: string[] = ['display', 'v'];
    display: 'page' | 'popup' | 'touch' | 'wap' = 'popup';
    v: string;

}
