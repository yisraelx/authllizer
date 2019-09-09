import { AxiosError } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';

export interface ISignInUser {
    email?: string;
    password?: string;
}

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent extends Vue {

    user: ISignInUser = {};

    async signIn() {
        let valid = await this.$validator.validateAll();
        if (!valid) {
            return;
        }

        this
            .$auth
            .signIn(this.user)
            .then(() => {
                this.$toasted.success('You have successfully signed in!');
                this.$router.push('/');
            })
            .catch((error: AxiosError) => {
                let {response, message}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || message);
            });
    }

    authenticate(provider: string) {
        this
            .$auth
            .authenticate(provider)
            .then(() => {
                this.$toasted.success(`You have successfully signed in with ${ provider }!`);
                this.$router.push('/');
            })
            .catch((error: AxiosError) => {
                let {response, message}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || message);
            });
    }

}
