import {Component} from 'angular-ts-decorators';
import {IComponentController, IHttpResponse} from 'angular';
import {IToastrService} from 'angular-toastr';
import {Authllizer} from '@authllizer/core';
import {AccountService} from '../common/account.service';

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
        this.Account.getProfile()
            .then(({data}: IHttpResponse<IProfileUser>) => {
                this.user = data;
            })
            .catch((response: IHttpResponse<{ message: string }>) => {
                this.toastr.error(response.data ? response.data.message : response.statusText, response.status as any);
            });
    }

    updateProfile() {
        this.Account.updateProfile(this.user)
            .then(async () => {
                await this.getProfile();
                this.toastr.success('Profile has been updated');
            })
            .catch((response: IHttpResponse<{ message: string }>) => {
                this.toastr.error(response.data ? response.data.message : response.statusText, response.status as any);
            });
    }

    link(provider: string) {
        this.$auth.link(provider)
            .then(async () => {
                await this.getProfile();
                this.toastr.success(`You have successfully linked a ${provider} account`);
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

    unlink(provider: string) {
        this.$auth.unlink(provider)
            .then(async () => {
                await this.getProfile();
                this.toastr.info(`You have unlinked a ${provider} account`);
            })
            .catch((response) => {
                this.toastr.error(response.data ? response.data.message : `Could not unlink ${provider} account`, response.status);
            });
    }

}
