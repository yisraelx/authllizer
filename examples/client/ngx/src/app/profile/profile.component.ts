import {Component, OnInit} from '@angular/core';
import {AccountService} from '../common/account.service';
import {ToastsManager} from 'ng2-toastr';
import {Authllizer} from '@authllizer/core';
import {HttpErrorResponse} from '@angular/common/http';

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

  constructor(private account: AccountService, private auth: Authllizer, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.account.getProfile()
      .then((user: IProfileUser) => {
        this.user = user;
      })
  }

  updateProfile() {
    this.account.updateProfile(this.user)
      .then(async () => {
        await this.getProfile();
        this.toastr.success('Profile has been updated');
      }).catch(({error, message, status}: HttpErrorResponse) => {
      this.toastr.error(typeof error === 'object' && error.message ? error.message : message, status as any);
    });
  }

  link(provider: string) {
    this.auth.link(provider)
      .then(async () => {
        await this.getProfile();
        this.toastr.success(`You have successfully linked a ${provider} account`);
      })
      .catch((response: Error | HttpErrorResponse) => {
        if ((response as HttpErrorResponse).error) {
          let {error} = (response as HttpErrorResponse);
          this.toastr.error(error.message ? error.message : error);
        } else if (!(response as HttpErrorResponse).message) {
          this.toastr.error(response.message);
        } else {
          this.toastr.error(response as any);
        }
      });
  }

  unlink(provider: string) {
    this.auth.unlink(provider)
      .then(async () => {
        await this.getProfile();
        this.toastr.info(`You have unlinked a ${provider} account`);
      })
      .catch(({error, status}: HttpErrorResponse) => {
        this.toastr.error(typeof error === 'object' && error.message ? error.message : `Could not unlink ${provider} account`, status as any);
      });
  }
}
