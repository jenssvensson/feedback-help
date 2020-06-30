import { CartService } from './../common/cart.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private http: HttpClient;
  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(private cartStore: CartService) {}

  removeProduct(product) {
    this.cartStore.removeFromCart(product);
  }

  checkout() {
    console.log('checkout called');
  }

  getTotalPrice() {

  }

  ngOnInit() {
    // this.cartSubscription = this.cartStore.getState().subscribe(res => {
    //   this.cart = res.products;
    //   this.getTotalPrice();
    // });
  }

  ngOnDestroy(): void {
    // this.cartSubscription.unsubscribe();
  }
}
