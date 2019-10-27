import { IOAuth2ProviderOptions, OAuth2Provider } from '@authllizer/core';

export interface IGoogleOAuth2Options extends IOAuth2ProviderOptions {
    nonce?: string;
    prompt?: 'none' | 'consent' | 'select_account';
    display?: 'page' | 'popup' | 'touch' | 'wap';
    loginHint?: string;
    accessType?: 'offline' | 'online';
    includeGrantedScopes?: boolean;
    openidRealm?: string;
    hd?: string;
}

/**
 * @resource https://developers.google.com/identity/protocols/OpenIDConnect
 */
export default class GoogleOAuth2 extends OAuth2Provider {

    static extend: (options: IGoogleOAuth2Options) => typeof GoogleOAuth2;

    name = 'google';
    authorizationEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    redirectUri = window.location.origin;
    scopeParams = ['profile', 'email'];
    scopePrefix = 'openid';
    scopeDelimiter = ' ';
    displayOptions = { width: 452, height: 633 };

    dialogParams = ['nonce', 'prompt', 'display', 'login_hint', 'access_type', 'include_granted_scopes', 'openid.realm', 'hd'];
    nonce: string;
    prompt: 'none' | 'consent' | 'select_account';
    display: 'page' | 'popup' | 'touch' | 'wap' = 'popup';
    loginHint: string;
    accessType: 'offline' | 'online';
    includeGrantedScopes: boolean;
    openidRealm: string;
    hd: string;
}
