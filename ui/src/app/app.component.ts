import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SEOService} from "./seo.service";
import {GoogleAnalyticsService} from "./google-analytics.service";
import {environment} from '../environments/environment';
import {NgxMetrikaService} from "../../projects/ngx-metrika/src/lib/ngx-metrika.service";
import {MetrikaGoalEventOptions} from "../../projects/ngx-metrika/src/lib/interfaces";

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              seoService: SEOService,
              private googleAnalyticsService: GoogleAnalyticsService,
              private ngxMetrikaService: NgxMetrikaService
  ) {
    seoService.addSeoData();
    let goal: MetrikaGoalEventOptions = {type: 'TARGET_NAME'};
    this.ngxMetrikaService.reachGoal.emit(goal);
    if (environment.googleAnalyticsKey != '') {
      this.appendGaTrackingCode();
    }
  }

  private appendGaTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '` + environment.googleAnalyticsKey + `');
           `;
      document.head.appendChild(script);
    } catch (ex) {
      console.error('Error appending Google analytics');
      console.error(ex);
    }
  }

  private appendYmTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
      (function (d, w, c) {
      (w[c] = w[c] || []).push(function() {
        try {
          w.yaCounter` + environment.yaCounterId + ` = new Ya.Metrika2({
            id:` + environment.yaCounterId + `,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,            
          });
        } catch(e) { }
      });

      const n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";

      if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
      } else { f(); }
    })(document, window, "yandex_metrika_callbacks2");
     `;
      document.head.appendChild(script);
    } catch (ex) {
      console.error('Error appending Yandex metrika');
      console.error(ex);
    }
  }


  ngOnInit() {
    // Somewhere else we can emit a new ga event
    //this.googleAnalyticsService.emitEvent("eventName","testCategory", "testAction", "testLabel", 10);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0, 0);
    });
  }

  /* myFunction() {
     this.getElementById("dropdown-content").classList.toggle("show");
   }*/
}
