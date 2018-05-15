import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CartModule} from "../cart/cart.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CartModule
  ],
  exports: [CommonModule, FormsModule, CartModule/*StoreFrontComponent, ShoppingCartComponent*/],
  declarations: [/*StoreFrontComponent, ShoppingCartComponent*/]
})
export class SharedModule { }
