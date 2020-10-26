import { TokenInterceptor } from './authentication/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxPayPalModule } from 'ngx-paypal';

import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    FooterComponent,
    UploadComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CartComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    NgxPayPalModule
  ],
  providers: [
    fakeBackendProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
