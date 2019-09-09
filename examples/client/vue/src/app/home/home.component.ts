import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent extends Vue {

    stars = '';
    forks = '';
    issues = '';

    mounted() {
        axios
            .get('https://api.github.com/repos/yisraelx/authllizer')
            .then(({data}: AxiosResponse) => {
                if (data) {
                    if (data.stargazers_count) {
                        this.stars = data.stargazers_count;
                    }
                    if (data.forks) {
                        this.forks = data.forks;
                    }
                    if (data.open_issues) {
                        this.issues = data.open_issues;
                    }
                }
            });
    }

}
