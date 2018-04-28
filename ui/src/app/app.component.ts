import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SEOService} from "./seo.service";
import {GoogleAnalyticsService} from "./google-analytics.service";
import { environment } from '../environments/environment';

declare var gtag:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'app';

  constructor(private router: Router,
              seoService: SEOService,
              private googleAnalyticsService: GoogleAnalyticsService
              ){
    seoService.addSeoData();
    this.appendGaTrackingCode();
  }

  private appendGaTrackingCode() {
    try {
      //const script1 = document.createElement('script');
      //script1.innerHTML = ` async src="https://www.googletagmanager.com/gtag/js?id=` + environment.googleAnalyticsKey + `">`;
      //document.head.appendChild(script1);
      const script2 = document.createElement('script');
      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '` + environment.googleAnalyticsKey + `');
           `;
      document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }

  ngOnInit() {
    // Somewhere else we can emit a new ga event
    this.googleAnalyticsService.emitEvent("eventName","testCategory", "testAction", "testLabel", 10);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0,0);
    });
  }
}
