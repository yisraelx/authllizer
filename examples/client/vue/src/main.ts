import Vue from 'vue';
import VueRouter from 'vue-router';
import * as VeeValidate from 'vee-validate';
import Snotify from 'vue-snotify';
import * as VueAxios from 'vue-axios';
import axios from 'axios';
import { AppComponent } from './app/app.component';

import VueAuthllizer, { VueAxiosHttpClient, VueAxiosTokenInterceptor } from '@authllizer/vue';
import { BackendAdapter, OAuth2Provider } from '@authllizer/core';

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

import { environment } from './environments/environment';

import './styles.css';

Vue.use(Snotify, { toast: { showProgressBar: false, position: 'rightTop' } });
Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueAuthllizer, {
  adapter: BackendAdapter.extend({
    baseUrl: `${environment.backendUrl}/auth`
  }),
  httpClient: new VueAxiosHttpClient,
  interceptList: [environment.backendUrl],
  providers: {
    bitbucket: BitbucketOAuth2.extend({
      clientId: 'YOUR_BITBUCKET_CLIENT_ID'
    }),
    facebook: FacebookOAuth2.extend({
      clientId: 'YOUR_FACEBOOK_CLIENT_ID'
    }),
    foursquare: OAuth2Provider.extend({
      name: 'foursquare',
      clientId: 'YOUR_FOURSQUARE_CLIENT_ID',
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    }),
    github: GithubOAuth2.extend({
      clientId: 'YOUR_GITHUB_CLIENT_ID'
    }),
    google: GoogleOAuth2.extend({
      clientId: 'YOUR_GOOGLE_CLIENT_ID'
    }),
    instagram: InstagramOAuth2.extend({
      clientId: 'YOUR_INSTAGRAM_CLIENT_ID'
    }),
    linkedin: LinkedinOAuth2.extend({
      clientId: 'YOUR_LINKEDIN_CLIENT_ID'
    }),
    live: LiveOAuth2.extend({
      clientId: 'YOUR_LIVE_CLIENT_ID'
    }),
    reddit: RedditOAuth2.extend({
      clientId: 'YOUR_REDDIT_CLIENT_ID'
    }),
    spotify: SpotifyOAuth2.extend({
      clientId: 'YOUR_SPOTIFY_CLIENT_ID'
    }),
    twitch: TwitchOAuth2.extend({
      clientId: 'YOUR_TWITCH_CLIENT_ID'
    }),
    twitter: TwitterOAuth1,
    vk: VkOAuth2.extend({
      clientId: 'YOUR_VK_CLIENT_ID'
    }),
    wordpress: WordpressOAuth2.extend({
      clientId: 'YOUR_WORDPRESS_CLIENT_ID'
    }),
    yahoo: YahooOAuth2.extend({
      clientId: 'YOUR_YAHOO_CLIENT_ID'
    })
  }
});

axios.interceptors.request.use(VueAxiosTokenInterceptor);

new AppComponent().$mount('#app-main');
