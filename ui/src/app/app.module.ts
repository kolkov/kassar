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
import {Kassatka7Component} from "./equipment/kassatka7/kassatka7.component";
import { EquipmentHomeComponent } from './equipment/equipment-home/equipment-home.component';
import {EquipmentMainComponent} from "./equipment/main/main.component";
import { KassatkaMiniComponent } from './equipment/kassatka-mini/kassatka-mini.component';
import { Kassatka10Component } from './equipment/kassatka10/kassatka10.component';

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
    EquipmentMainComponent,
    EquipmentHomeComponent,
    KassatkaMiniComponent,
    Kassatka10Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
