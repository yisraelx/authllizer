import { Component } from 'angular-ts-decorators';
import { IComponentController, IHttpService } from 'angular';
import { IToastrService } from 'angular-toastr';
import { Authllizer } from '@authllizer/core'

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
    this.$auth.signUp(this.user, true)
      .then((response) => {
        this.$location.path('/');
        this.toastr.info('You have successfully created a new account and have been signed-in');
      })
      .catch((response) => {
        this.toastr.error(response.data.message);
      });
  }
}
