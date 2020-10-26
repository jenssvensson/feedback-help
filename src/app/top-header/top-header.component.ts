import { AlertService } from './../alert/alert.service';
import { CartService } from './../common/cart.service';
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

  public loggedOn: boolean;
  public navbarOpen = false;
  public user: any;
  public totalPrice: number;
  public totalQuantity: any;

  constructor(
      private authenticationService: AuthenticationService,
      private cart: CartService,
      private alertService: AlertService
      ) {
    this.authenticationService.isAuthenticated.subscribe(x => this.loggedOn = x);
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    this.cart.itemCount.subscribe(itemCount => this.totalQuantity = itemCount);
    this.cart.totalAmount.subscribe(amount => this.totalPrice = amount);
  }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authenticationService.logout();
    const options = {
      autoClose: true,
      keepAfterRouteChange: true
    };
    this.alertService.info('Du är nu utloggad', options);
  }

}
