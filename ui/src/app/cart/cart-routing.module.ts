import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopulatedCartGuard} from "./guards/populated-cart.guard";
import {OrderConfirmationComponent} from "./components/order-confirmation/order-confirmation.component";
import {CartComponent} from "./components/cart/cart.component";
import {CartServicesComponent} from "./components/cart-services/cart-services.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {CartDeliveryComponent} from "./components/cart-delivery/cart-delivery.component";
import {CartPaymentComponent} from "./components/cart-payment/cart-payment.component";
import {CartConfirmComponent} from "./components/cart-confirm/cart-confirm.component";


const routes: Routes = [
  {
    path: 'order',
    component: CartComponent,
    children: [
      {
        path: 'services',
        component: CartServicesComponent
      },
      {
        path: 'delivery',
        component: CartDeliveryComponent
      },
      {
        path: 'payment',
        component: CartPaymentComponent
      },
      {
        path: 'confirm',
        component: CartConfirmComponent
      },
      {
        path: 'complete',
        component: OrderConfirmationComponent,
        canActivate: [PopulatedCartGuard]
      },
      {
        path: '',
        component: CheckoutComponent,
        canActivate: [PopulatedCartGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
