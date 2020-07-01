import { Product } from './../products/Product.model';
import { CartProduct } from './../common/cart.model';
import { CartService } from './../common/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: CartProduct[] = [];
  public totalPrice: number;
  public totalQuantity: number;
  private productsSubription: Subscription;
  private amountSubription: Subscription;
  private itemsSubription: Subscription;

  constructor(private cartStore: CartService) {
  }

  removeProduct(product) {
    this.cartStore.removeFromCart(product);
  }

  changeQuantity(type: string, product: Product) {
    if (type === 'add') {
      this.cartStore.addToCart(product);
    } else {
      this.cartStore.decreaseQuantity(product);
    }
  }

  checkout() {
    console.log('checkout called');
  }

  ngOnInit() {
    this.productsSubription = this.cartStore.products.subscribe(products => { this.cart = products; });
    this.amountSubription = this.cartStore.totalAmount.subscribe(amount => { this.totalPrice = amount; });
    this.itemsSubription = this.cartStore.itemCount.subscribe(count => { this.totalQuantity = count; });
  }

  ngOnDestroy(): void {
    this.productsSubription.unsubscribe();
    this.amountSubription.unsubscribe();
    this.itemsSubription.unsubscribe();
  }
}
