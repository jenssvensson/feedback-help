import { HttpClient } from '@angular/common/http';
import { PRODUCTS } from './product-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://127.0.0.1:8080/products');
  }

}
