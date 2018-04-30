import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    CompanyModule,
    CatalogModule,
    ServicesModule,
    AppRoutingModule,
  ],
  providers: [SEOService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
