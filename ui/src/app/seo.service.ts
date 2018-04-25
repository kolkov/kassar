import { Injectable } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  public addSeoData() : void {
    this.router.events.subscribe(() => {
    if(!((event: any) => event instanceof NavigationEnd)){
      return;
    }
      let root = this.router.routerState.snapshot.root;
      while (root) {
        if (root.children && root.children.length) {
          root = root.children[0];
        } else if (root.data && root.data["title"]) {
          this.titleService.setTitle(root.data["title"] + " | Компания Кассар");
          let tags = root.data["metatags"];
          for (let tag in tags) {
            this.metaService.addTag({ name: tag, content: tags[tag] });
          }
          return;
        } else {
          return;
        }
      }
    });
  }
}
