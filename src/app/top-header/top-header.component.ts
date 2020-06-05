import { AuthenticationService } from '../authentication/authentication.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopHeaderComponent implements OnInit {

  loggedOn: boolean;
  navbarOpen = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.isAuthenticated.subscribe(x => this.loggedOn = x);
  }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

}
