import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Authllizer } from '@authllizer/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../common/account.service';

export interface IProfileUser {
    picture?: string;
    displayName?: string;
    email?: string;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: IProfileUser = {
        displayName: '',
        email: ''
    };

    constructor(private account: AccountService, private auth: Authllizer, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getProfile();
    }

    async getProfile() {
        this.user = await this.account.getProfile();
    }

    async updateProfile() {
        try {
            await this.account.updateProfile(this.user);
            await this.getProfile();
            this.toastr.success('Profile has been updated.');
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

    async link(provider: string) {
        try {
            await this.auth.link(provider);
            await this.getProfile();
            this.toastr.success(`You have successfully linked a ${ provider } account.`);
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

    async unlink(provider: string) {
        try {
            await this.auth.unlink(provider);
            await this.getProfile();
            this.toastr.info(`You have unlinked a ${ provider } account.`);
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

}
