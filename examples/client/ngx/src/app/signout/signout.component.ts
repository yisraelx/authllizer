import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {Authllizer} from '@authllizer/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signout',
  template: ``
})
export class SignOutComponent implements OnInit {

  constructor(private auth: Authllizer, private toastr: ToastsManager, private router: Router) {
  }

  ngOnInit() {
    this.auth.signOut().then(() => {
      this.toastr.info('You have been logged out');
    }).catch(({error, message, status}: HttpErrorResponse) => {
      this.toastr.error(typeof error === 'object' && error.message ? error.message : message, status as any);
    });
    this.router.navigateByUrl('/');
  }

}
