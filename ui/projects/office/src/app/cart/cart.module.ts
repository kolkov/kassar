import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import {MatModule} from "../root/mat/mat.module";
import { CartDetailsComponent } from './cart-details/cart-details.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    CartRoutingModule
  ],
  declarations: [CartComponent, CartListComponent, CartDetailsComponent]
})
export class CartModule { }
