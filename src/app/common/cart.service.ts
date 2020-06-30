import { Injectable } from '@angular/core';
import { Product } from '../products/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public products: Product[];

  addToCart(product: Product) {
    console.log('addToCart called with: ', product);
  }

  removeFromCart(product: Product) {
    console.log('removeFromCart called', product);
  }

  constructor() { }
}
