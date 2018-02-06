import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr';
import { Authllizer } from '@authllizer/core';

export interface ISignInUser {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  user: ISignInUser = {};

  constructor(private auth: Authllizer, private toastr: ToastsManager, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.auth.signIn(this.user)
      .then(() => {
        this.toastr.success('You have successfully signed in!');
        this.router.navigateByUrl('/');
      })
      .catch(({error,message,status}:HttpErrorResponse) => {
        this.toastr.error(typeof error === 'object' && error.message ? error.message : message, status as any);
      });
  }

  authenticate(provider: string) {
    this.auth.authenticate(provider)
      .then(() => {
        this.toastr.success('You have successfully signed in with ' + provider + '!');
        this.router.navigateByUrl('/');
      })
      .catch((response: Error | HttpErrorResponse) => {
        if ((response as HttpErrorResponse).error) {
          let {error} = (response as HttpErrorResponse);
          this.toastr.error(typeof error === 'object' && error.message  ? error.message : error);
        } else if (!(response as HttpErrorResponse).message) {
          this.toastr.error(response.message);
        } else {
          this.toastr.error(response as any);
        }
      });
  };
}
