import { Authllizer } from '@authllizer/core';
import UiRouterModule, {
    Ng1StateDeclaration,
    StateObject,
    StateProvider,
    StateService,
    Transition,
    UrlService
} from '@uirouter/angularjs';
import { ILocationProvider } from 'angular';
import { NgModule } from 'angular-ts-decorators';

/*@ngInject*/
function checkAuth($transition$: Transition, $state: StateService, $auth: Authllizer) {
    let {data: {auth}}: StateObject = $transition$.$to();
    if ($auth.isAuthenticated() !== auth) {
        return $state.target(auth ? 'signin' : 'home');
    }
}

export let STATES: Ng1StateDeclaration[] = [
    {name: 'signin', url: '/signin', component: 'signin', data: {auth: false}, onEnter: checkAuth},
    {name: 'signup', url: '/signup', component: 'signup', data: {auth: false}, onEnter: checkAuth},
    {name: 'signout', url: '/signout', component: 'signout', data: {auth: true}, onEnter: checkAuth},
    {name: 'profile', url: '/profile', component: 'profile', data: {auth: true}, onEnter: checkAuth},
    {name: 'home', url: '/', component: 'home'}
];

@NgModule({
    id: 'AppRoutingModule',
    imports: [
        UiRouterModule
    ],
})
export class AppRoutingModule {

    /*@ngInject*/
    static config($urlServiceProvider: UrlService, $stateProvider: StateProvider, $locationProvider: ILocationProvider) {
        $locationProvider.html5Mode(true);
        STATES.forEach(state => $stateProvider.state(state));
        $urlServiceProvider.rules.otherwise({state: 'home'});
    }

}
