import { Authllizer } from '@authllizer/core';
import { IComponentController, IHttpResponse } from 'angular';
import { IToastrService } from 'angular-toastr';
import { Component } from 'angular-ts-decorators';

@Component({
    selector: 'signout'
})
export class SignOutComponent implements IComponentController {

    /*@ngInject*/
    constructor(private $location, private $auth: Authllizer, private toastr: IToastrService) {
    }

    $onInit() {
        this
            .$auth
            .signOut()
            .then(() => {
                this.$location.path('/');
                this.toastr.info('You have been logged out!');
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

}
