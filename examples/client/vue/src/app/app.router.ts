import VueRouter, { Route } from 'vue-router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

function checkAuthBeforeEnter({ meta: { auth } }: Route, redirect, next) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return appRouter.app.$auth.isAuthenticated() === auth ? next() : next(auth ? '/signin' : '/');
}

function singOutBeforeEnter(route: Route, redirect, next) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!appRouter.app.$auth.isAuthenticated()) {
        return next('/');
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    appRouter
        .app
        .$auth
        .signOut()
        .then(() => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            appRouter.app.$toasted.info('You have been logged out!');
        });
    next('/');
}

export let appRouter = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/signin', component: SignInComponent, meta: { auth: false }, beforeEnter: checkAuthBeforeEnter },
        { path: '/signup', component: SignUpComponent, meta: { auth: false }, beforeEnter: checkAuthBeforeEnter },
        { path: '/profile', component: ProfileComponent, meta: { auth: true }, beforeEnter: checkAuthBeforeEnter },
        { path: '/signout', beforeEnter: singOutBeforeEnter },
        { path: '/', alias: '/home', component: HomeComponent },
    ]
});
