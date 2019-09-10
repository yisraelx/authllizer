import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authllizer } from '@authllizer/core';
import { ToastrService } from 'ngx-toastr';

export interface ISignUpUser {
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

    user: ISignUpUser = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    constructor(private auth: Authllizer, private toastr: ToastrService, private router: Router) {
    }

    async signUp() {
        try {
            await this.auth.signUp(this.user, true);
            await this.router.navigateByUrl('/');
            this.toastr.info('You have successfully created a new account and have been signed-in!');
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }
}
