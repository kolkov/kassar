import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SEOService} from "./seo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit /*,AfterViewInit*/{
  //title = 'app';

  constructor(private router: Router, seoService: SEOService){
    seoService.addSeoData();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0,0);
    });
  }

 /* ngAfterViewInit() {
    window.scroll(0,0);
  }*/
}
