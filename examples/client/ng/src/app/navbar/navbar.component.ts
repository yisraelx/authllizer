import { Component } from 'angular-ts-decorators';
import { IComponentController } from 'angular';
import { Authllizer } from '@authllizer/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements IComponentController {

    /*@ngInject*/
    constructor(private $auth: Authllizer) { }

    isAuthenticated() {
        return this.$auth.isAuthenticated();
    }
}
