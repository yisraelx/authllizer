import Vue from 'vue';
import Component from 'vue-class-component';
import {AxiosResponse, AxiosError} from 'axios';

export interface ISignInUser {
    email?: string;
    password?: string;
}

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent extends Vue {

    user: ISignInUser = {};

    mounted() {

    }

    async signIn() {
        let valid = await this.$validator.validateAll();
        if (!valid) return;
        this.$auth.signIn(this.user)
            .then(() => {
                this.$snotify.success('You have successfully signed in!');
                this.$router.push('/');
            })
            .catch(({response}: AxiosError) => {
                this.$snotify.error(response.data && response.data.message ? response.data.message : response.statusText, response.status);
            });
    }

    authenticate(provider: string) {
        this.$auth.authenticate(provider)
            .then(() => {
                this.$snotify.success('You have successfully signed in with ' + provider + '!');
                this.$router.push('/');
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
}
