import {Component} from '@angular/core';
import {Validators, FormGroup, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {NavController, ToastController, AlertController} from 'ionic-angular';
import {Authllizer} from '@authllizer/core';
import {HomePage} from '../home/home';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  static compareToValidator(thatName: string, otherName: string): ValidatorFn {
    return (group: FormGroup): any => {
      let that: AbstractControl = group.controls[thatName];
      let other: AbstractControl = group.controls[otherName];
      if (that.value !== other.value) {
        return other.setErrors({compareTo: that.value});
      }
    };
  }

  public signUpForm: FormGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
  }, SignUpPage.compareToValidator('password', 'confirmPassword'));

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public auth: Authllizer) {
  }

  signUp() {

    this.auth.signUp(this.signUpForm.value, true)
      .then(() => {
        this.navCtrl.setRoot(HomePage);
        this.toastCtrl.create({
          message: 'You have successfully created a new account and have been signed-in',
          duration: 3000,
          position: 'top'
        }).present();
      })
      .catch(({error, message, status}: HttpErrorResponse) => {
        this.alertCtrl.create({
          title: status as any,
          message: typeof error === 'object' && error.message ? error.message : message,
          buttons: ['Dismiss']
        }).present();
      });
  }

}
