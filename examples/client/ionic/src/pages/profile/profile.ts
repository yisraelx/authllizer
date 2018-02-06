import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NavController, ToastController, AlertController} from 'ionic-angular';
import {AccountProvider} from '../../providers/account/account';
import {Authllizer} from '@authllizer/core';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  public user: any = {};

  public profileForm: FormGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required])
  });

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public auth: Authllizer, public account: AccountProvider) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.account.getProfile()
      .then((user: any) => {
        this.user = user;
        let {email = '', displayName = ''} = user;
        this.profileForm.setValue({email, displayName});
      })
  }

  updateProfile() {
    this.account.updateProfile(this.profileForm.value)
      .then(async () => {
        await this.getProfile();
        this.toastCtrl.create({
          message: 'Profile has been updated',
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

  link(provider: string) {
    this.auth.link(provider)
      .then(async () => {
        await this.getProfile();
        this.toastCtrl.create({
          message: `You have successfully linked a ${provider} account`,
          duration: 3000,
          position: 'top'
        }).present();
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
  }

  unlink(provider: string) {
    this.auth.unlink(provider)
      .then(async () => {
        await this.getProfile();
        this.toastCtrl.create({
          message: `You have unlinked a ${provider} account`,
          duration: 3000,
          position: 'top'
        }).present();
      })
      .catch(({error, status}: HttpErrorResponse) => {
        this.alertCtrl.create({
          title: status as any,
          message: typeof error === 'object' && error.message ? error.message : `Could not unlink ${provider} account`,
          buttons: ['Dismiss']
        }).present();
      });
  }

}
