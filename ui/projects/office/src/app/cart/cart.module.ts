import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import {MatModule} from "../root/mat/mat.module";

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    CartRoutingModule
  ],
  declarations: [CartComponent, CartListComponent]
})
export class CartModule { }
