import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "./cart.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";

const routes: Routes = [
  {
    path: ':id',
    component: CartDetailsComponent
  },
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
