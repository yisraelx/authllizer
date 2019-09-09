import { IHttpService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import environment from '../../environments/environment';

@Injectable('Account')
export class AccountService {

    /*@ngInject*/
    constructor(private $http: IHttpService) {
    }

    getProfile() {
        return this.$http.get(`${ environment.backendUrl }/api/me`);
    }

    updateProfile(profileData) {
        return this.$http.put(`${ environment.backendUrl }/api/me`, profileData);
    }

}
