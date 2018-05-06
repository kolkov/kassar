import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common"
import {environment} from "../environments/environment";

/** Google analytics */
/* tslint:disable */

declare var Ya: any;

@Injectable({
  providedIn: 'root'
})
export class YandexMetrikaService {

  constructor(public router: Router, private location: Location) {
    if (environment.yandexMetrikaKey != ''){
      let prevPath = this.location.path() ? this.location.path() : '/';
      this.router.events.subscribe(event => {
        try {
          if (typeof Ya === 'function') {
            if (event instanceof NavigationEnd) {
              let ya = window['yaCounter' + environment.yandexMetrikaKey];
              const newPath = this.location.path() ? this.location.path() : '/';
              ya.hit(newPath, {referer: prevPath});
              prevPath = newPath;
              console.log('%%% Yandex Metrika page view event %%%');
            }
          }
          }catch (e) {
          console.log(e);
        }
      });
    }
  }
}
