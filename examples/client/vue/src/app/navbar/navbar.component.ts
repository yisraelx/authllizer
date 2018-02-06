import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    templateUrl: './navbar.component.html'
})
export class NavbarComponent extends Vue {

    isAuth: boolean;
    
    mounted() {
        this.$auth.onChange.on(() => {
            let isAuth = this.$auth.isAuthenticated();
            this.$set(this, 'isAuth', isAuth);
        });
    }

    data() {
        return {
            isAuth: this.$auth.isAuthenticated()
        };
    }
}
