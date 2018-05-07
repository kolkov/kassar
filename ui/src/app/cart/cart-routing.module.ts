import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreFrontComponent} from "./components/store-front/store-front.component";
import {PopulatedCartGuard} from "./guards/populated-cart.guard";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {OrderConfirmationComponent} from "./components/order-confirmation/order-confirmation.component";


const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [PopulatedCartGuard],

  },
  {
    path: 'confirmed',
    component: OrderConfirmationComponent,
    canActivate: [PopulatedCartGuard]
  },
  {
    path: 'cart',
    component: StoreFrontComponent,
    canActivate: [PopulatedCartGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
