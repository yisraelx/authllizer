import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authllizer } from '@authllizer/core';
import { ToastrService } from 'ngx-toastr';

export interface ISignInUser {
    email?: string;
    password?: string;
}

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent {

    user: ISignInUser = {};

    constructor(private auth: Authllizer, private toastr: ToastrService, private router: Router) {
    }

    async signIn() {
        try {
            await this.auth.signIn(this.user);
            await this.router.navigateByUrl('/');
            this.toastr.success('You have successfully signed in!');
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

    async authenticate(provider: string) {
        try {
            await this.auth.authenticate(provider);
            await this.router.navigateByUrl('/');
            this.toastr.success(`You have successfully signed in with ${ provider }!`);
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

}
