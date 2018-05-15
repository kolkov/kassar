import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyRoutingModule} from './company-routing.module';
import {CompanyHomeComponent} from "./company-home/company-home.component";
import {CompanyComponent} from "./company.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyComponent,
    CompanyHomeComponent,
    AboutComponent,
    ContactsComponent,
  ]
})
export class CompanyModule { }
