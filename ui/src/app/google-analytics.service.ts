import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {environment} from "../environments/environment";

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(public router: Router) {
    if (environment.googleAnalyticsKey !== '') {
      this.router.events.subscribe(event => {
        try {
          if (typeof gtag === 'function') {
            if (event instanceof NavigationEnd) {
              gtag('config', environment.googleAnalyticsKey, {'page_path': event.urlAfterRedirects});
              console.log('%%% Google Analytics page view event %%%');
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  }

  /**
   * Emit google analytics event
   * Fire event example:
   * this.emitEvent("testCategory", "testAction", "testLabel", 10);
   * @param {string} eventName
   * @param {string} eventCategory
   * @param {string} eventAction
   * @param {string} eventLabel
   * @param {number} eventValue
   */
  public emitEvent(eventName: string,
                   eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        //send_to: environment.googleAnalyticsKey,
        'event_category': eventCategory,
        'event_label': eventLabel,
        'event_action': eventAction,
        'value': eventValue
      });
    }
  }


}
