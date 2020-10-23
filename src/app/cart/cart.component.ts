import { AuthenticationService } from './../authentication/authentication.service';
import { Product } from './../products/Product.model';
import { CartProduct } from './../common/cart.model';
import { CartService } from './../common/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public loggedOn: boolean;
  public cart: CartProduct[] = [];
  public loginOption: any = true;
  public totalPrice: number;
  public totalQuantity: number;
  private productsSubription: Subscription;
  private amountSubription: Subscription;
  private itemsSubription: Subscription;
  public payPalConfig?: IPayPalConfig;


  constructor(private cartStore: CartService, private authenticationService: AuthenticationService) {
    this.authenticationService.isAuthenticated.subscribe(x => this.loggedOn = x);
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
    this.initConfig();
  }

  ngOnDestroy(): void {
    this.productsSubription.unsubscribe();
    this.amountSubription.unsubscribe();
    this.itemsSubription.unsubscribe();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // TODO inform server
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}
