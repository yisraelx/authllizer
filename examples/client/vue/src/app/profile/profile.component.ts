import Vue from 'vue';
import Component from 'vue-class-component';
import Account from '../common/account.service';
import {AxiosResponse, AxiosError} from 'axios';

export interface IProfileUser {
    picture?: string;
    displayName?: string;
    email?: string;
}

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent extends Vue {

    user: IProfileUser = {};

    mounted() {
        this.getProfile();
    }


    getProfile() {
        Account.getProfile()
            .then(({data}: AxiosResponse) => {
                this.$set(this, 'user', data);
            })
            .catch(({response}: AxiosError) => {
                this.$snotify.error(response.data && response.data.message ? response.data.message : response.statusText, response.status);
            });
    }

    async updateProfile() {
        let valid = await this.$validator.validateAll();
        if (!valid) {
            return;
        }
        Account.updateProfile(this.user)
            .then(async () => {
                await this.getProfile();
                this.$snotify.success('Profile has been updated');
            })
            .catch(({response}: AxiosError) => {
                this.$snotify.error(response.data && response.data.message ? response.data.message : response.statusText, response.status);
            });
    }

    link(provider: string) {
        this.$auth.link(provider)
            .then(async () => {
                await this.getProfile();
                this.$snotify.success('You have successfully linked a ' + provider + ' account');
            })
            .catch((error: Error | AxiosError) => {
                if ((error as AxiosError).response) {
                    let response: AxiosResponse = (error as AxiosError).response;
                    // HTTP response error from server
                    this.$snotify.error(response.data && response.data.message ? response.data.message : response.statusText, response.status as any);
                } else if ((error as Error).message) {
                    // Authllizer promise reject error.
                    this.$snotify.error((error as Error).message);
                } else {
                    this.$snotify.error(error as any);
                }
            });
    }

    unlink(provider: string) {

        this.$auth.unlink(provider)
            .then(async () => {
                await this.getProfile();
                this.$snotify.info('You have unlinked a ' + provider + ' account');
            })
            .catch(({response}: AxiosError) => {
                this.$snotify.error(response.data && response.data.message ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
            });
    }
}
