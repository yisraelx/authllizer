import { Component } from '@angular/core';
import { Authllizer } from '@authllizer/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor(private auth: Authllizer) {
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

}
