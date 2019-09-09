import { AxiosError, AxiosResponse } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import Account from '../common/account.service';

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
        Account
            .getProfile()
            .then(({data}: AxiosResponse) => {
                this.$set(this, 'user', data);
            });
    }

    async updateProfile() {
        let valid = await this.$validator.validateAll();
        if (!valid) {
            return;
        }
        Account
            .updateProfile(this.user)
            .then(() => this.getProfile())
            .then(() => {
                this.$toasted.success('Profile has been updated.');
            })
            .catch((error: AxiosError) => {
                let {response, message}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || message);
            });
    }

    link(provider: string) {
        this
            .$auth
            .link(provider)
            .then(() => this.getProfile())
            .then(() => {
                this.$toasted.success(`You have successfully linked a ${ provider } account.`);
            })
            .catch((error: AxiosError) => {
                let {response, message}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || message);
            });
    }

    unlink(provider: string) {
        this
            .$auth
            .unlink(provider)
            .then(() => this.getProfile())
            .then(() => {
                this.$toasted.info(`You have unlinked a ${ provider } account.`);
            })
            .catch((error: AxiosError) => {
                let {response}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || `Could not unlink ${ provider } account.`);
            });
    }

}
