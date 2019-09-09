import { Authllizer } from '@authllizer/core';
import { IComponentController } from 'angular';
import { Component } from 'angular-ts-decorators';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements IComponentController {

    /*@ngInject*/
    constructor(private $auth: Authllizer) {
    }

    isAuthenticated() {
        return this.$auth.isAuthenticated();
    }

}
