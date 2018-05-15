import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {CartHomeService, PageDescription} from "../cart-home.service";
import {SEOService} from "../../seo.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit {
  id: string;
  pageDescription$: Observable<PageDescription>;

  constructor(private activateRoute: ActivatedRoute,
              private cartHomeService: CartHomeService,
              private seoService: SEOService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.pageDescription$ = this.cartHomeService.getPageDescription(this.id)
      .pipe(
        tap(page => {
          if (!page) this.router.navigate(['/404']);
          this.seoService.setSeoData(page.heading, page.tags);
        }),
      )
  }

}
