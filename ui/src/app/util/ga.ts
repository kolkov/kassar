/** Google analytics */
/* tslint:disable */

import {NavigationEnd} from "@angular/router";

export function initAnalytics() {
  (<any>(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * (<any>new Date());
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  }))(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  let ga = window['ga'];

  ga('create', 'UA-68934357-3', 'auto');
  ga('set', 'forceSSL', true);
  ga('send', 'pageview');
}



/*export function googleAnalyticsHook() {
  this.router.events.subscribe((event: Event) => {
    // Send GA tracking on NavigationEnd event. You may wish to add other
    // logic here too or change which event to work with
    if (event instanceof NavigationEnd) {
      // When the route is '/', location.path actually returns ''.
      let newRoute = this.location.path() || '/';
      // If the route has changed, send the new route to analytics.
      if (this.currentRoute != newRoute) {
        ga('send', 'pageview', newRoute);
        //console.log('would send to ga: ' + newRoute);
        this.currentRoute = newRoute;
      }
    }
  });
}*/
