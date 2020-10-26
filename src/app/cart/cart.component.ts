import { AlertService } from './../alert/alert.service';
import { PaypalAmountSummary } from './../common/paypalAmountSummary.model';
import { PaypalItemSpec } from './../common/paypalItemSpec.model';
import { AuthenticationService } from './../authentication/authentication.service';
import { Product } from './../products/Product.model';
import { CartProduct } from './../common/cart.model';
import { CartService } from './../common/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';

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
  private currencyCode = 'SEK';
  public payPalConfig?: IPayPalConfig;


  constructor(
      private router: Router,
      private alertService: AlertService,
      private cartStore: CartService,
      private authenticationService: AuthenticationService
    ) {
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

  private createItemsSpec(): PaypalItemSpec[] {
    const itemSpec: PaypalItemSpec[] = [];
    this.cart.forEach(product => {
      const item = new PaypalItemSpec();
      item.name = product.Product.name;
      item.quantity = product.quantity.toString();
      item.unit_amount = {
        value: product.Product.price.toString(),
        currency_code: this.currencyCode
      };
      itemSpec.push(item);
    });
    return itemSpec;
  }

  private createAmountSummary(): PaypalAmountSummary {
    const summary: PaypalAmountSummary = new PaypalAmountSummary();
    summary.currency_code = this.currencyCode;
    summary.value = this.totalPrice.toString();
    summary.breakdown = {
      item_total: {
        currency_code: this.currencyCode,
        value: this.totalPrice.toString()
      }
    };
    return summary;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'SEK',
      clientId: 'ATMoNP201BNWcaJ5nCFbRq05pKZogjeTUAaLF-Jqv3vMILcv0Nv-lrgTYwjB071NYBMKhvXD7T73ptCx',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: this.createAmountSummary(),
            items: this.createItemsSpec()
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
        // Empty cart
        this.cartStore.emptyCart();

        // Show success notification
        const options = {
          autoClose: true,
          keepAfterRouteChange: true
        };
        this.alertService.success('Payment successful....Sucker!!!', options);

        // Redirect to upload page
        this.router.navigate(['/upload']);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        const options = {
          autoClose: true,
          keepAfterRouteChange: true
        };
        this.alertService.success('Payment aborted, DONT DO THAT!', options);
      },
      onError: err => {
        console.log('OnError', err);
        const options = {
          autoClose: true,
          keepAfterRouteChange: true
        };
        this.alertService.success('Error when making payment, not alright, poor idiot, try again!', options);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}
