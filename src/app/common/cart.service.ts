import { BehaviorSubject, Subscription } from 'rxjs';
import { CartProduct } from './cart.model';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../products/Product.model';
import isEqual from 'lodash/isEqual';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  public products: BehaviorSubject<CartProduct[]>;
  public totalAmount: BehaviorSubject<number>;
  public itemCount: BehaviorSubject<number>;
  private productSubscription: Subscription;

  constructor() {
    this.products = new BehaviorSubject<CartProduct[]>([]);
    this.totalAmount = new BehaviorSubject<number>(0);
    this.itemCount = new BehaviorSubject<number>(0);
    this.productSubscription = this.products.subscribe(cart => {
      let count = 0;
      let amount = 0;
      cart.forEach((cartProduct: CartProduct) => {
        amount = amount + cartProduct.Product.price * cartProduct.quantity;
        count = count + cartProduct.quantity;
      });
      this.totalAmount.next(amount);
      this.itemCount.next(count);
    });
    this.products.next(this.getCart());
   }

  addToCart(product: Product) {
    const prod = this.products.getValue();
    const found = prod && prod.find(cartproduct => {
      if (isEqual(product, cartproduct.Product)) {
        cartproduct.quantity++;
        return true;
      }
      return false;
    });
    if (!found) {
      prod.push({Product: product, quantity: 1});
    }
    this.updateCart(prod);
  }

  decreaseQuantity(product: Product){
    const prod = this.products.getValue();
    if (prod) {
      prod.find(cartproduct => {
        if (isEqual(product, cartproduct.Product)) {
          if (cartproduct.quantity > 1) {
            cartproduct.quantity--;
          }
        }
      });
      this.updateCart(prod);
    }
  }

  private updateCart(cartProd: CartProduct[]) {
    this.products.next(cartProd);
    localStorage.setItem('cart', JSON.stringify(cartProd));
  }

  public getCart(): CartProduct[] {
    const cart = localStorage.getItem('cart');
    const temp = cart ? JSON.parse(cart) : [];
    return temp;
  }

  public emptyCart() {
    this.updateCart([]);
  }

  removeFromCart(product: Product) {
    let prod = this.products.getValue();
    prod = prod.filter(cartproduct => {
      return !isEqual(product, cartproduct.Product);
    });
    this.updateCart(prod);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
