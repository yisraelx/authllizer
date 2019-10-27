import { Authllizer } from '@authllizer/core';
import { IComponentController, IHttpResponse } from 'angular';
import { IToastrService } from 'angular-toastr';
import { Component } from 'angular-ts-decorators';
import { AccountService } from '../common/account.service';

export interface IProfileUser {
    picture?: string;
    displayName?: string;
    email?: string;
}

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements IComponentController {

    user: IProfileUser;

    /*@ngInject*/
    constructor(private $auth: Authllizer, private toastr: IToastrService, private Account: AccountService) {
    }

    $onInit() {
        this.getProfile();
    }

    getProfile() {
        this
            .Account
            .getProfile()
            .then(({ data }: IHttpResponse<IProfileUser>) => {
                this.user = data;
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

    updateProfile() {
        this
            .Account
            .updateProfile(this.user)
            .then(async () => {
                await this.getProfile();
                this.toastr.success('Profile has been updated.');
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

    link(provider: string) {
        this
            .$auth
            .link(provider)
            .then(async () => {
                await this.getProfile();
                this.toastr.success(`You have successfully linked a ${ provider } account.`);
            })
            .catch((response: IHttpResponse<{message: string}> | Error | any) => {
                this.toastr.error((response.data && response.data.message) || (response.statusText || response.message));
            });
    }

    unlink(provider: string) {
        this
            .$auth
            .unlink(provider)
            .then(async () => {
                await this.getProfile();
                this.toastr.info(`You have unlinked a ${ provider } account.`);
            })
            .catch((response) => {
                this.toastr.error(response.data ? response.data.message : `Could not unlink ${ provider } account.`);
            });
    }

}
