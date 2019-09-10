import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Authllizer } from '@authllizer/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: Authllizer, public toastCtrl: ToastController, public alertCtrl: AlertController, public  navCtrl: NavController) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async signOut() {
        try {
            await this.auth.signOut();
            await this.navCtrl.navigateRoot('/');

            let toast = await this.toastCtrl.create({
                message: `You have been logged out!`,
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
