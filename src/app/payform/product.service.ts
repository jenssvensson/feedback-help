import { PRODUCTS } from './product-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    return Promise.resolve(PRODUCTS);
  }
}
