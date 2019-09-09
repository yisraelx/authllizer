import { BackendAdapter, OAuth2Provider } from '@authllizer/core';

import VueAuthllizer, { VueAxiosHttpClient, VueAxiosTokenInterceptor } from '@authllizer/vue';

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
import axios from 'axios';
import * as VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueToasted from 'vue-toasted';
import { AppComponent } from './app/app.component';

import environment from './environments/environment';

import './styles.css';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        templateUrl?: string;
    }
}

Vue.use(VueToasted, {position: 'top-right', duration: 5000});
Vue.use(VeeValidate, {events: 'change'});
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueAuthllizer, {
    adapter: BackendAdapter.extend({
        baseUrl: `${ environment.backendUrl }/auth`
    }),
    httpClient: new VueAxiosHttpClient,
    interceptList: [environment.backendUrl],
    providers: {
        bitbucket: BitbucketOAuth2.extend({
            clientId: environment.bitbucketClientId
        }),
        facebook: FacebookOAuth2.extend({
            clientId: environment.facebookClientId
        }),
        foursquare: OAuth2Provider.extend({
            name: 'foursquare',
            clientId: environment.foursquareClientId,
            authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
        }),
        github: GithubOAuth2.extend({
            clientId: environment.githubClientId
        }),
        google: GoogleOAuth2.extend({
            clientId: environment.googleClientId
        }),
        instagram: InstagramOAuth2.extend({
            clientId: environment.instagramClientId
        }),
        linkedin: LinkedinOAuth2.extend({
            clientId: environment.linkedinClientId
        }),
        live: LiveOAuth2.extend({
            clientId: environment.liveClientId
        }),
        reddit: RedditOAuth2.extend({
            clientId: environment.redditClientId
        }),
        spotify: SpotifyOAuth2.extend({
            clientId: environment.spotifyClientId
        }),
        twitch: TwitchOAuth2.extend({
            clientId: environment.twitchClientId
        }),
        twitter: TwitterOAuth1,
        vk: VkOAuth2.extend({
            clientId: environment.vkClientId
        }),
        wordpress: WordpressOAuth2.extend({
            clientId: environment.wordpressClientId
        }),
        yahoo: YahooOAuth2.extend({
            clientId: environment.yahooClientId
        })
    }
});

axios.interceptors.request.use(VueAxiosTokenInterceptor);

new AppComponent().$mount('#app-main');
