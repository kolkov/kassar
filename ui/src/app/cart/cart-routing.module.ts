import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PopulatedCartGuard} from "./guards/populated-cart.guard";
import {OrderCompleteComponent} from "./components/order-complete/order-complete.component";
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
        component: CartServicesComponent,
        canActivate: [PopulatedCartGuard]
      },
      {
        path: 'delivery',
        component: CartDeliveryComponent,
        canActivate: [PopulatedCartGuard]
      },
      {
        path: 'payment',
        component: CartPaymentComponent,
        canActivate: [PopulatedCartGuard]
      },
      {
        path: 'confirm',
        component: CartConfirmComponent,
        canActivate: [PopulatedCartGuard]
      },
      {
        path: 'complete',
        component: OrderCompleteComponent,
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
export class CartRoutingModule {
}
