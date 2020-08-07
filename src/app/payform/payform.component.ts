import { HttpClient } from '@angular/common/http';
import { ProductService } from '../products/product.service';
import { Product } from '../products/Product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'payform',
  templateUrl: './payform.component.html',
  styleUrls: ['./payform.component.scss']
})
export class PayformComponent implements OnInit {

  products: Product[];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
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
