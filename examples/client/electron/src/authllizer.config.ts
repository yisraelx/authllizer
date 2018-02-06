import authllizer, {BackendAdapter, BrowserDialog, OAuth2Provider} from '@authllizer/core';
import ElectronDialog, {isElectron} from 'authllizer-electron-dialog';

import BitbucketOAuth2 from 'authllizer-bitbucket-oauth2';
import FacebookOAuth2 from 'authllizer-facebook-oauth2';
import GithubOAuth2 from 'authllizer-github-oauth2';
import GoogleOAuth2 from 'authllizer-google-oauth2';
import InstagramOAuth2 from 'authllizer-instagram-oauth2';
import LinkedinOAuth2 from 'authllizer-linkedin-oauth2';
import LiveOAuth2 from 'authllizer-live-oauth2';
import RedditOAuth2 from 'authllizer-reddit-oauth2';
import SpotifyOAuth2 from 'authllizer-spotify-oauth2';
import TwitchOAuth2 from 'authllizer-twitch-oauth2';
import TwitterOAuth1 from 'authllizer-twitter-oauth1';
import VkOAuth2 from 'authllizer-vk-oauth2';
import WordpressOAuth2 from 'authllizer-wordpress-oauth2';
import YahooOAuth2 from 'authllizer-yahoo-oauth2';

import {environment} from './environments/environment';

export let PROVIDERS = {
    bitbucket: BitbucketOAuth2.extend({
        clientId: 'YOUR_BITBUCKET_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    facebook: FacebookOAuth2.extend({
        clientId: 'YOUR_FACEBOOK_CLIENT_ID',
        redirectUri: `${environment.redirectUri}/`
    }),
    foursquare: OAuth2Provider.extend({
        name: 'foursquare',
        clientId: 'YOUR_FOURSQUARE_CLIENT_ID',
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
        redirectUri: environment.redirectUri
    }),
    github: GithubOAuth2.extend({
        clientId: 'YOUR_GITHUB_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    google: GoogleOAuth2.extend({
        clientId: 'YOUR_GOOGLE_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    instagram: InstagramOAuth2.extend({
        clientId: 'YOUR_INSTAGRAM_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    linkedin: LinkedinOAuth2.extend({
        clientId: 'YOUR_LINKEDIN_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    live: LiveOAuth2.extend({
        clientId: 'YOUR_LIVE_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    reddit: RedditOAuth2.extend({
        clientId: 'YOUR_REDDIT_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    spotify: SpotifyOAuth2.extend({
        clientId: 'YOUR_SPOTIFY_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    twitch: TwitchOAuth2.extend({
        clientId: 'YOUR_TWITCH_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    twitter: TwitterOAuth1.extend({
        redirectUri: environment.redirectUri
    }),
    vk: VkOAuth2.extend({
        clientId: 'YOUR_VK_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    wordpress: WordpressOAuth2.extend({
        clientId: 'YOUR_WORDPRESS_CLIENT_ID',
        redirectUri: environment.redirectUri
    }),
    yahoo: YahooOAuth2.extend({
        clientId: 'YOUR_YAHOO_CLIENT_ID',
        redirectUri: environment.redirectUri
    })
};


authllizer.config({
    adapter: BackendAdapter.extend({
        baseUrl: `${environment.backendUrl}/auth`
    }),
    dialog: isElectron() ? ElectronDialog.extend({displayOptions: {useContentSize: true}}) : BrowserDialog,
    interceptList: [
        environment.backendUrl
    ],
    providers: PROVIDERS
});