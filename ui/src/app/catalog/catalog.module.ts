import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import {StoreFrontComponent} from "../cart/components/store-front/store-front.component";
import {ShoppingCartComponent} from "../cart/components/shopping-cart/shopping-cart.component";
import { CartHomeComponent } from './cart-home/cart-home.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import {CatalogComponent} from "./catalog.component";

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule
  ],
  declarations: [
    CatalogComponent,
    CatalogHomeComponent,
    StoreFrontComponent,
    ShoppingCartComponent,
    CartHomeComponent,
    CartDetailsComponent
  ]
})
export class CatalogModule { }
