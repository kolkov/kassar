import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/not-found.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import {SEOService} from "./seo.service";
import { NewsComponent } from './news/news.component';
import { ServicesComponent } from './services/services.component';
import {Kassatka7Component} from "./equipment/kkt/kassatka7/kassatka7.component";
import { EquipmentHomeComponent } from './equipment/equipment-home/equipment-home.component';
import { KassatkaMiniComponent } from './equipment/kkt/kassatka-mini/kassatka-mini.component';
import { Kassatka10Component } from './equipment/kkt/kassatka10/kassatka10.component';
import { KktComponent } from './equipment/kkt/kkt.component';
import { KktHomeComponent } from './equipment/kkt/kkt-home/kkt-home.component';
import { HomeComponent } from './services/home/home.component';
import {PricelistComponent} from "./services/pricelist/pricelist.component";
import { ScannersComponent } from './equipment/scanners/scanners.component';
import { ScannersHomeComponent } from './equipment/scanners/scanners-home/scanners-home.component';
import {GoogleAnalyticsService} from "./google-analytics.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    EquipmentComponent,
    MainComponent,
    ContactsComponent,
    NewsComponent,
    ServicesComponent,
    Kassatka7Component,
    EquipmentHomeComponent,
    KassatkaMiniComponent,
    Kassatka10Component,
    KktComponent,
    KktHomeComponent,
    PricelistComponent,
    HomeComponent,
    ScannersComponent,
    ScannersHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SEOService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
