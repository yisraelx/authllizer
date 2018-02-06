import { IQService, ILocationService } from 'angular';
import { Ng1StateDeclaration } from '@uirouter/angularjs';
import { Authllizer } from '@authllizer/core';

/*@ngInject*/
function signInRequired($q: IQService, $location: ILocationService, $auth: Authllizer) {
    let deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $location.path('/signin');
    }
    return deferred.promise;
}

/*@ngInject*/
function rejectIfSignIn($q: IQService, $auth: Authllizer) {
    return $auth.isAuthenticated() ? $q.reject() : $q.resolve();
}

export let STATES: Ng1StateDeclaration[] = [
    { name: 'signin', url: '/signin', component: 'signin', resolve: { rejectIfSignIn } },
    { name: 'signup', url: '/signup', component: 'signup', resolve: { rejectIfSignIn } },
    { name: 'signout', url: '/signout', component: 'signout', resolve: { signInRequired } },
    { name: 'profile', url: '/profile', component: 'profile', resolve: { signInRequired } },
    { name: 'home', url: '/', component: 'home' }
];
