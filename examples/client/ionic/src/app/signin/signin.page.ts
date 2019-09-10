import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authllizer } from '@authllizer/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
    selector: 'page-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss']
})
export class SignInPage {

    public signInForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public auth: Authllizer) {
    }

    ionViewWillEnter() {
        if (this.auth.isAuthenticated()) {
            this.navCtrl.navigateRoot('/home');
        }
    }

    async signIn() {
        try {
            await this.auth.signIn(this.signInForm.value);
            await this.navCtrl.navigateRoot('/home');

            let toast = await this.toastCtrl.create({
                message: 'You have successfully signed in!',
                duration: 3000,
                position: 'top'
            });
            await toast.present();
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            let alert = await this.alertCtrl.create({
                message: (error && error.message) || message,
                buttons: ['Dismiss']
            });
            await alert.present();
        }
    }

    async authenticate(provider: string) {
        try {
            await this.auth.authenticate(provider);
            await this.navCtrl.navigateRoot('/home');

            let toast = await this.toastCtrl.create({
                message: `You have successfully signed in with ${ provider }!`,
                duration: 3000,
                position: 'top'
            });
            await toast.present();
        } catch (response) {
            let {error, message}: HttpErrorResponse = response;
            let alert = await this.alertCtrl.create({
                message: (error && error.message) || message,
                buttons: ['Dismiss']
            });
            await alert.present();
        }
    }

}
