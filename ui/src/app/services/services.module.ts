import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicesRoutingModule} from './services-routing.module';
import {HomeComponent as ServiceHomeComponent} from "./home/home.component";
import {PricelistComponent} from "./pricelist/pricelist.component";
import {ServicesComponent} from "./services.component";
import {OnlajnKassyComponent} from './onlajn-kassy/onlajn-kassy.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesRoutingModule
  ],
  declarations: [
    ServicesComponent,
    PricelistComponent,
    ServiceHomeComponent,
    OnlajnKassyComponent
  ]
})
export class ServicesModule {
}
