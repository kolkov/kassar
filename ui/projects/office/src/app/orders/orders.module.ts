import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import {MatModule} from "../root/mat/mat.module";
import {SharedModule} from "../shared/shared.module";
import {MatNativeDateModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    MatNativeDateModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, OrdersListComponent, OrdersDetailsComponent]
})
export class OrdersModule { }
