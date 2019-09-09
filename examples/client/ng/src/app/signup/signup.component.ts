import { Authllizer } from '@authllizer/core';
import { IComponentController, IHttpResponse } from 'angular';
import { IToastrService } from 'angular-toastr';
import { Component } from 'angular-ts-decorators';

export interface ISignUpUser {
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements IComponentController {

    user: ISignUpUser;

    /*@ngInject*/
    constructor(private $location, private $auth: Authllizer, private toastr: IToastrService) {
    }

    signUp() {
        this
            .$auth
            .signUp(this.user, true)
            .then(() => {
                this.$location.path('/');
                this.toastr.info('You have successfully created a new account and have been signed-in!');
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

}
