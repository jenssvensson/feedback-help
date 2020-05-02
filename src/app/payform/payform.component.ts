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

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    this.productService.getProducts().then(products => this.products = products);
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
