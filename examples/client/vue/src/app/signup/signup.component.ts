import Vue from 'vue';
import Component from 'vue-class-component';
import {passwordStrengthDirective} from './password-strength.directive';
import {AxiosError} from 'axios';

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

    mounted() {

    }

    async signUp() {
        let valid = await this.$validator.validateAll();
        if (!valid) {
            return;
        }
        this.$auth.signUp(this.user, true)
            .then(() => {
                this.$router.push('/');
                this.$snotify.info('You have successfully created a new account and have been signed-in');
            })
            .catch(({response}: AxiosError) => {
                this.$snotify.error(response.data && response.data.message ? response.data.message : response.statusText, response.status);
            });

    }
}
