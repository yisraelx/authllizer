import {Component} from 'angular-ts-decorators';
import {IComponentController, IHttpResponse} from 'angular';
import {IToastrService} from 'angular-toastr';
import {Authllizer} from '@authllizer/core';

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
        this.$auth.signIn(this.user)
            .then(() => {
                this.toastr.success('You have successfully signed in!');
                this.$location.path('/');
            })
            .catch((response: IHttpResponse<{ message: string }>) => {
                this.toastr.error(response.data ? response.data.message : response.statusText, response.status as any);
            });
    }

    authenticate(provider: string) {
        this.$auth.authenticate(provider)
            .then(() => {
                this.toastr.success('You have successfully signed in with ' + provider + '!');
                this.$location.path('/');
            })
            .catch((error: Error | IHttpResponse<{ message: string }>) => {
                if ((error as Error).message) {
                    // Authllizer promise reject error.
                    this.toastr.error((error as Error).message);
                } else if ((error as IHttpResponse<any>).data) {
                    // HTTP response error from server
                    this.toastr.error((error as IHttpResponse<any>).data.message, (error as IHttpResponse<any>).status as any);
                } else {
                    this.toastr.error(error as any);
                }
            });
    }

}
