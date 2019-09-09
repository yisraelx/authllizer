import axios from 'axios';
import environment from '../../environments/environment';

export default class Account {

    static getProfile() {
        return axios.get(`${ environment.backendUrl }/api/me`);
    }

    static updateProfile(profileData) {
        return axios.put(`${ environment.backendUrl }/api/me`, profileData);
    }

}
