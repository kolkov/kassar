import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreFrontComponent} from "../cart/components/store-front/store-front.component";
import {ShoppingCartComponent} from "../cart/components/shopping-cart/shopping-cart.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonModule, FormsModule, StoreFrontComponent, ShoppingCartComponent],
  declarations: [StoreFrontComponent, ShoppingCartComponent]
})
export class SharedModule { }
