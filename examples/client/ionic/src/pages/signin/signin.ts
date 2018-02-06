import {Component} from '@angular/core';
import {NavController, ToastController, AlertController} from 'ionic-angular';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Authllizer} from '@authllizer/core';
import {HomePage} from '../../pages/home/home';
import {SignUpPage} from '../../pages/signup/signup';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  public signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public auth: Authllizer) {
  }

  signIn() {
    this.auth.signIn(this.signInForm.value)
      .then(() => {
        this.toastCtrl.create({
          message: 'You have successfully signed in!',
          duration: 3000,
          position: 'top'
        }).present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(({error, message, status}: HttpErrorResponse) => {
        this.alertCtrl.create({
          title: status as any,
          message: typeof error === 'object' && error.message ? error.message : message,
          buttons: ['Dismiss']
        }).present();
      });
  }

  authenticate(provider: string) {
    this.auth.authenticate(provider)
      .then(() => {
        this.toastCtrl.create({
          message: `You have successfully signed in with ${provider}!`,
          duration: 3000,
          position: 'top'
        }).present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((response: Error | HttpErrorResponse) => {
        if ((response as HttpErrorResponse).error) {
          let {error} = (response as HttpErrorResponse);
          this.alertCtrl.create({
            message: error.message ? error.message : error,
            buttons: ['Dismiss']
          }).present();
        } else if (!(response as HttpErrorResponse).message) {
          this.alertCtrl.create({
            message: response.message,
            buttons: ['Dismiss']
          }).present();
        } else {
          this.alertCtrl.create({
            message: response as any,
            buttons: ['Dismiss']
          }).present();
        }
      });
  };

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }
}
