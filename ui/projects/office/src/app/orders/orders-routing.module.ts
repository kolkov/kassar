import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./orders.component";
import {OrdersDetailsComponent} from "./orders-details/orders-details.component";

const routes: Routes = [
  {
    path: ':id',
    component: OrdersDetailsComponent
  },
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
