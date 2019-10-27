import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authllizer } from '@authllizer/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signout',
    template: ``
})
export class SignOutComponent implements OnInit {

    constructor(private auth: Authllizer, private toastr: ToastrService, private router: Router) {
    }

    ngOnInit() {
        this.signOut();
    }

    async signOut() {
        try {
            await this.auth.signOut();
            await this.router.navigateByUrl('/');
            this.toastr.info('You have been logged out!');
        } catch (response) {
            let { error, message }: HttpErrorResponse = response;
            this.toastr.error((error && error.message) || message);
        }
    }

}
