import { CartService } from './../common/cart.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from './Product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  quantity: number;

  constructor(private productService: ProductService, private router: Router, private cart: CartService) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.productService.getProducts().subscribe(products => this.products =  products as Product[]);
  }

  // When add to cart button is clicked
  addToCart(product) {
    this.cart.addToCart(product);
    // this.cartStore.addToCart(product, this.quantity || 1);
    // this.alertService.success('Added ' + product.name + ' to cart.');
  }
}
