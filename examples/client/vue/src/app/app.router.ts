import VueRouter from 'vue-router';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './signin/signin.component';
import {SignUpComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';

export let appRouter = new VueRouter({
    routes: [
        {path: '/signin', component: SignInComponent, beforeEnter: skipIfLoggedIn},
        {path: '/signup', component: SignUpComponent, beforeEnter: skipIfLoggedIn},
        {path: '/profile', component: ProfileComponent, beforeEnter: loginRequired},
        {
            path: '/signout', beforeEnter(to, from, next) {
                if (!appRouter.app.$auth.isAuthenticated()) return next(false);
                appRouter.app.$auth.signOut().then(() => {
                    appRouter.app.$snotify.info('You have been logged out');
                });
                next('/');
            }
        },
        {path: '/', component: HomeComponent}
    ]
});


function skipIfLoggedIn(to, from, next) {
    return appRouter.app.$auth.isAuthenticated() ? next(false) : next();
}

function loginRequired(to, from, next) {
    if (appRouter.app.$auth.isAuthenticated()) {
        next();
    } else {
        next('/signin');
    }
}
