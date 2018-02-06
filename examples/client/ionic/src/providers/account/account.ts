import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AccountProvider {

  constructor(private http: HttpClient) {
  }

  getProfile() {
    return this.http.get(`${environment.backendUrl}/api/me`).toPromise();
  }

  updateProfile(profileData) {
    return this.http.put(`${environment.backendUrl}/api/me`, profileData).toPromise();
  }
}

