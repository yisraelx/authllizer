import {Component} from 'angular-ts-decorators';
import {IComponentController, IHttpResponse} from 'angular';
import {IToastrService} from 'angular-toastr';
import {Authllizer} from '@authllizer/core';

@Component({
    selector: 'signout'
})
export class SignOutComponent implements IComponentController {


    /*@ngInject*/
    constructor(private $location, private $auth: Authllizer, private toastr: IToastrService) {
    }

    $onInit() {
        this.$auth.signOut()
            .then(() => {
                this.toastr.info('You have been logged out');
                this.$location.path('/');
            })
            .catch((response: IHttpResponse<{ message: string }>) => {
                this.toastr.error(response.data ? response.data.message : response.statusText, response.status as any);
            });
    }
}
