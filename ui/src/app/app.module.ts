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

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    EquipmentComponent,
    MainComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SEOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
