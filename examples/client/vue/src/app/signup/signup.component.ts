import { AxiosError } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import { passwordStrengthDirective } from './password-strength.directive';

export interface ISignUpUser {
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

@Component({
    templateUrl: './signup.component.html',
    directives: {
        'password-strength': passwordStrengthDirective
    }
})
export class SignUpComponent extends Vue {

    user: ISignUpUser = {
        displayName: '',
        email: '',
        password: ''
    };
    confirmPassword: string = '';

    async signUp() {
        let valid: boolean = await this.$validator.validateAll();
        if (!valid) {
            return;
        }

        this
            .$auth
            .signUp(this.user, true)
            .then(() => {
                this.$router.push('/');
                this.$toasted.info('You have successfully created a new account and have been signed-in!');
            })
            .catch((error: AxiosError) => {
                let {response, message}: AxiosError = error;
                this.$toasted.error((response && ((response.data && response.data.message) || response.statusText)) || message);
            });
    }

}
