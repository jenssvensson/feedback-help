import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from './Product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'payform',
  templateUrl: './payform.component.html',
  styleUrls: ['./payform.component.scss']
})
export class PayformComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.productService.getProducts().subscribe(products => this.products =  products as Product[]);
  }

  payWithSwish() {
    // TODO hook up to swish
    this.router.navigateByUrl('/upload');
  }

  payWithPaypal() {
    // TODO hook up to paypal
    this.router.navigateByUrl('/upload');
  }

}
