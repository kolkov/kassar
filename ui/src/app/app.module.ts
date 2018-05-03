import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './notfound/not-found.component';
import {HomeComponent} from './home/home.component';
import {SEOService} from "./seo.service";
import {NewsComponent} from './company/news/news.component';
import {GoogleAnalyticsService} from "./google-analytics.service";
import {CompanyModule} from "./company/company.module";
import {CatalogModule} from "./catalog/catalog.module";
import {ServicesModule} from "./services/services.module";
import {BlogModule} from "./blog/blog.module";
import {HttpClientModule} from "@angular/common/http";
import { HomeNewsComponent } from './home/home-news/home-news.component';
import {ServiceCenterModule} from "./service-center/service-center.module";
import {CartModule} from "./cart/cart.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    NewsComponent,
    HomeNewsComponent,
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
  providers: [SEOService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
