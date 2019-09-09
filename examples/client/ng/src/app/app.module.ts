import { BackendAdapter, OAuth2Provider } from '@authllizer/core';

import AuthllizerModule, { AuthProvider } from '@authllizer/ng';
import { IHttpProvider, IQService, IWindowService } from 'angular';
import NgAnimateModule from 'angular-animate';
import NgMessagesModule from 'angular-messages';
import NgResourceModule from 'angular-resource';
import NgToastrModule from 'angular-toastr';
import { NgModule } from 'angular-ts-decorators';

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

import environment from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccountService } from './common/account.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './signin/signin.component';
import { SignOutComponent } from './signout/signout.component';
import { PasswordMatchDirective } from './signup/password-match.direcive';
import { PasswordStrengthDirective } from './signup/password-strength.directive';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    id: 'AppModule',
    imports: [
        NgResourceModule,
        NgMessagesModule,
        NgAnimateModule,
        NgToastrModule,
        AuthllizerModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        SignInComponent,
        SignUpComponent,
        PasswordMatchDirective,
        PasswordStrengthDirective,
        SignOutComponent,
        ProfileComponent
    ],
    providers: [
        AccountService
    ]
})
export class AppModule {

    /*@ngInject*/
    static config($authProvider: AuthProvider, $httpProvider: IHttpProvider) {

        $authProvider.config({
            adapter: BackendAdapter.extend({
                baseUrl: `${ environment.backendUrl }/auth`
            }),
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

        $httpProvider.interceptors.push('tokenInterceptor');
    }

    /*@ngInject*/
    static run($window: IWindowService, $q: IQService) {
        $window.Promise = $q;
    }
}
