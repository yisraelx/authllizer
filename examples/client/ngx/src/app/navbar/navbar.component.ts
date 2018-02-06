import { Component, OnInit } from '@angular/core';
import { Authllizer } from '@authllizer/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: Authllizer) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

}
