import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authllizer } from '@authllizer/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AccountProvider } from '../services/account.service';

@Component({
    selector: 'page-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
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

    async getProfile() {
        let { email = '', displayName = '' } = this.user = await this.account.getProfile() as any;
        this.profileForm.setValue({ email, displayName });
    }

    async updateProfile() {
        try {
            await this.account.updateProfile(this.profileForm.value);
            await this.getProfile();
            let toast = await this.toastCtrl.create({
                message: 'Profile has been updated.',
                duration: 3000,
                position: 'top'
            });
            await toast.present();
        } catch (response) {
            let { error, message }: HttpErrorResponse = response;
            let alert = await this.alertCtrl.create({
                message: (error && error.message) || message,
                buttons: ['Dismiss']
            });
            await alert.present();
        }
    }

    async link(provider: string) {
        try {
            await this.auth.link(provider);
            await this.getProfile();
            let toast = await this.toastCtrl.create({
                message: `You have successfully linked a ${ provider } account.`,
                duration: 3000,
                position: 'top'
            });
            await toast.present();
        } catch (response) {
            let { error, message }: HttpErrorResponse = response;
            let alert = await this.alertCtrl.create({
                message: (error && error.message) || message,
                buttons: ['Dismiss']
            });
            await alert.present();
        }
    }

    async unlink(provider: string) {
        try {
            await this.auth.unlink(provider);
            await this.getProfile();
            let toast = await this.toastCtrl.create({
                message: `You have unlinked a ${ provider } account.`,
                duration: 3000,
                position: 'top'
            });
            await toast.present();
        } catch (response) {
            let { error, message }: HttpErrorResponse = response;
            let alert = await this.alertCtrl.create({
                message: (error && error.message) || message,
                buttons: ['Dismiss']
            });
            await alert.present();
        }
    }

}
