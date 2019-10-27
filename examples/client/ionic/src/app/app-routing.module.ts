import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { AuthGuard } from './services/auth-guard.service';
import { SignInPage } from './signin/signin.page';
import { SignUpPage } from './signup/signup.page';

const routes: Routes = [
    { path: '', component: SignInPage },
    { path: 'signup', component: SignUpPage },
    { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
    { path: 'home', component: HomePage, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
