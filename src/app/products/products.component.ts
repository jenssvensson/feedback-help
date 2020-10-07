import { AlertService } from './../alert/alert.service';
import { Subscription } from 'rxjs';
import { CartService } from './../common/cart.service';
import { ProductService } from './product.service';
import { Product } from './Product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  quantity: number;
  subscription: Subscription;

  constructor(
      private productService: ProductService,
      private router: Router,
      private cart: CartService,
      private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.subscription = this.productService.getProducts().subscribe(
      products => {
        this.products =  products as Product[];
      },
      error => {
        const options = {
          autoClose: true,
          keepAfterRouteChange: true
        };
        this.alertService.error(error.error.message, options);
      });
  }

  addToCart(product) {
    this.cart.addToCart(product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
