import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SignOutComponent } from './signout/signout.component';
import { AuthGuard } from './common/auth-guard.service';

export const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SignInComponent, canLoad: [AuthGuard] },
    { path: 'signup', component: SignUpComponent, canLoad: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'signout', component: SignOutComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent }
];
