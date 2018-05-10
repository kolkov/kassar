import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

import {LocalStorageService} from "./services/storage.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {ProductsService} from "./services/products.service";
import {DeliveryOptionsService} from "./services/delivery-options.service";
import {PopulatedCartGuard} from "./guards/populated-cart.guard";
import { CartComponent } from './components/cart/cart.component';
import { CartServicesComponent } from './components/cart-services/cart-services.component';
import { CartDeliveryComponent } from './components/cart-delivery/cart-delivery.component';
import { CartPaymentComponent } from './components/cart-payment/cart-payment.component';
import { CartConfirmComponent } from './components/cart-confirm/cart-confirm.component';
import {StoreFrontComponent} from "./components/store-front/store-front.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule
  ],
  declarations: [StoreFrontComponent, ShoppingCartComponent, CheckoutComponent, OrderConfirmationComponent, CartComponent, CartServicesComponent, CartDeliveryComponent, CartPaymentComponent, CartConfirmComponent],
  exports: [StoreFrontComponent, ShoppingCartComponent],
  providers: [PopulatedCartGuard, LocalStorageService, ShoppingCartService, ProductsService, DeliveryOptionsService]
})
export class CartModule { }
