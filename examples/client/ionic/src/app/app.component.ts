import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SignInPage } from '../pages/signin/signin';
import { Authllizer } from '@authllizer/core';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth: Authllizer, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.rootPage = this.auth.isAuthenticated() ? HomePage : SignInPage;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.nav.setRoot(SignInPage);
    }).catch(({error, message, status}: HttpErrorResponse) => {
      this.alertCtrl.create({
        title: status as any,
        message: typeof error === 'object' && error.message ? error.message : message,
        cssClass: 'invalid',
        buttons: ['Dismiss']
      }).present();
    });
  }
}
