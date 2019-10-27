import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './signin/signin.component';
import { SignOutComponent } from './signout/signout.component';
import { SignUpComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'signin', component: SignInComponent, data: { auth: false }, canActivate: [AuthGuard] },
    { path: 'signup', component: SignUpComponent, data: { auth: false }, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, data: { auth: true }, canActivate: [AuthGuard] },
    { path: 'signout', component: SignOutComponent, data: { auth: true }, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
