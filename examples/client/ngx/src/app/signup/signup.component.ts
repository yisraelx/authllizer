import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Authllizer } from '@authllizer/core';

export interface ISignUpUser {
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  user: ISignUpUser = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(private auth: Authllizer, private toastr: ToastsManager, private router: Router) {
  }

  ngOnInit() {
  }

  signUp() {
    this.auth.signUp(this.user, true)
      .then((response) => {
        this.router.navigateByUrl('/');
        this.toastr.info('You have successfully created a new account and have been signed-in');
      })
      .catch(({error,message,status}:HttpErrorResponse) => {
        this.toastr.error(typeof error === 'object' && error.message ? error.message : message, status as any);
      });
  }
}
