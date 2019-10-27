import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Authllizer } from '@authllizer/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
    selector: 'page-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss']
})
export class SignUpPage {

    static compareToValidator(thatName: string, otherName: string): ValidatorFn {
        return (group: FormGroup): any => {
            let that: AbstractControl = group.controls[thatName];
            let other: AbstractControl = group.controls[otherName];
            if (that.value !== other.value) {
                return other.setErrors({ compareTo: that.value });
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

    async signUp() {
        try {
            await this.auth.signUp(this.signUpForm.value, true);
            await this.navCtrl.navigateRoot('/home');

            let toast = await this.toastCtrl.create({
                message: 'You have successfully created a new account and have been signed-in!',
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
