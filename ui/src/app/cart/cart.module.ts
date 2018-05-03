import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { StoreFrontComponent } from './components/store-front/store-front.component';
import {LocalStorageService} from "./services/storage.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {ProductsService} from "./services/products.service";
import {DeliveryOptionsService} from "./services/delivery-options.service";
import {PopulatedCartGuard} from "./guards/populated-cart.guard";

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  declarations: [CheckoutComponent, OrderConfirmationComponent, ShoppingCartComponent, StoreFrontComponent],
  providers: [PopulatedCartGuard, LocalStorageService, ShoppingCartService, ProductsService, DeliveryOptionsService]
})
export class CartModule { }
