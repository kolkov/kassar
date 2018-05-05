import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './notfound/not-found.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './company/news/news.component';
import {CompanyModule} from "./company/company.module";
import {CatalogModule} from "./catalog/catalog.module";
import {ServicesModule} from "./services/services.module";
import {BlogModule} from "./blog/blog.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeNewsComponent} from './home/home-news/home-news.component';
import {ServiceCenterModule} from "./service-center/service-center.module";
import {CartModule} from "./cart/cart.module";
import { BreadcrumbsComponent } from './breadcrubs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    NewsComponent,
    HomeNewsComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CompanyModule,
    CatalogModule,
    ServicesModule,
    ServiceCenterModule,
    BlogModule,
    CartModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
