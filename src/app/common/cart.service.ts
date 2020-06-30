import { BehaviorSubject } from 'rxjs';
import { CartProduct } from './cart.model';
import { Injectable } from '@angular/core';
import { Product } from '../products/Product.model';
import isEqual from 'lodash/isEqual';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: BehaviorSubject<CartProduct[]>;
  public totalAmount: BehaviorSubject<number>;
  public itemCount: BehaviorSubject<number>;

  constructor() {
    this.products = new BehaviorSubject<CartProduct[]>(this.getCart());
    this.totalAmount = new BehaviorSubject<number>(0);
    this.itemCount = new BehaviorSubject<number>(0);
    this.products.subscribe(cart => {
      let amount = 0;
      cart.forEach((cartProduct: CartProduct) => {
        amount = cartProduct.Product.price * cartProduct.quantity;
      });
      this.totalAmount.next(amount);
    });
   }

  addToCart(product: Product) {
    const prod = this.products.getValue();
    let items = 0;
    const found = prod && prod.find(cartproduct => {
      items = items + cartproduct.quantity;
      if (isEqual(product, cartproduct.Product)) {
        cartproduct.quantity++;
        items++;
        return true;
      }
      return false;
    });
    if (!found) {
      prod.push({Product: product, quantity: 1});
      items++;
    }
    this.updateCart(prod, items);
  }

  private updateCart(cartProd: CartProduct[], items: number) {
    this.products.next(cartProd);
    this.itemCount.next(items);
    localStorage.setItem('cart', JSON.stringify(cartProd));
  }

  public getCart(): CartProduct[] {
    const cart = JSON.parse(localStorage.getItem('cart'))
    return cart ? cart : [];
  }


  removeFromCart(product: Product) {
    console.log('removeFromCart called', product);
  }
}
