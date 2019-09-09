import Vue from 'vue';
import Component from 'vue-class-component';
import { appRouter } from './app.router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    router: appRouter,
    components: {
        navbar: NavbarComponent
    },
    templateUrl: './app.component.html'
})
export class AppComponent extends Vue {

}
