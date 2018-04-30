import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogHomeComponent } from './catalog-home/catalog-home.component';
import { KktComponent } from './kkt/kkt.component';
import { ScannersComponent } from './scanners/scanners.component';
import { OtherComponent } from './other/other.component';
import {CatalogComponent} from "./catalog.component";
import {Kassatka7Component} from "./kkt/kassatka7/kassatka7.component";
import {Kassatka10Component} from "./kkt/kassatka10/kassatka10.component";
import {KassatkaMiniComponent} from "./kkt/kassatka-mini/kassatka-mini.component";
import {KktHomeComponent} from "./kkt/kkt-home/kkt-home.component";
import {ScannersHomeComponent} from "./scanners/scanners-home/scanners-home.component";
import { OtherHomeComponent } from './other/other-home/other-home.component';

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule
  ],
  declarations: [
    CatalogComponent,
    CatalogHomeComponent,
    KktComponent,
    KktHomeComponent,
    Kassatka7Component,
    KassatkaMiniComponent,
    Kassatka10Component,
    ScannersComponent,
    ScannersHomeComponent,
    OtherComponent,
    OtherHomeComponent
  ]
})
export class CatalogModule { }
