import { Authllizer } from '@authllizer/core';
import { IComponentController, IHttpResponse } from 'angular';
import { IToastrService } from 'angular-toastr';
import { Component } from 'angular-ts-decorators';

export interface ISignInUser {
    email?: string;
    password?: string;
}

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})
export class SignInComponent implements IComponentController {

    user: ISignInUser;

    /*@ngInject*/
    constructor(private $location, private $auth: Authllizer, private toastr: IToastrService) {
    }

    signIn() {
        this
            .$auth
            .signIn(this.user)
            .then(() => {
                this.toastr.success('You have successfully signed in!');
                this.$location.path('/');
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

    authenticate(provider: string) {
        this
            .$auth
            .authenticate(provider)
            .then(() => {
                this.toastr.success(`You have successfully signed in with ${ provider }!`);
                this.$location.path('/');
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

}
