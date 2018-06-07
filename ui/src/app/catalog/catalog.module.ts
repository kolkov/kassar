import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogRoutingModule} from './catalog-routing.module';
import {CatalogHomeComponent} from './catalog-home/catalog-home.component';
import {CartHomeComponent} from './cart-home/cart-home.component';
import {CartDetailsComponent} from './cart-details/cart-details.component';
import {CatalogComponent} from "./catalog.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
  ],
  declarations: [
    CatalogComponent,
    CatalogHomeComponent,
    CartHomeComponent,
    CartDetailsComponent
  ]
})
export class CatalogModule {
}
