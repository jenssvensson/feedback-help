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

  constructor(private router: Router, private authenticationService: AuthenticationService, private cart: CartService) {
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
  }

}
