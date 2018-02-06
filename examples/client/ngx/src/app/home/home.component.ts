import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stars: number;
  forks: number;
  issues: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://api.github.com/repos/yisraelx/authllizer')
      .subscribe((response: any) => {
        if (response) {
          if (response.stargazers_count) {
            this.stars = response.stargazers_count;
          }
          if (response.forks) {
            this.forks = response.forks;
          }
          if (response.open_issues) {
            this.issues = response.open_issues;
          }
        }
      });
  }

}
