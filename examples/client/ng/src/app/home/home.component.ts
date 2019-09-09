import { IComponentController, IHttpService } from 'angular';
import { Component } from 'angular-ts-decorators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements IComponentController {

    stars: number;
    forks: number;
    issues: number;

    /*@ngInject*/
    constructor(private $http: IHttpService) {
    }

    $onInit() {
        this
            .$http
            .get('https://api.github.com/repos/yisraelx/authllizer')
            .then(({data}: any) => {
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
