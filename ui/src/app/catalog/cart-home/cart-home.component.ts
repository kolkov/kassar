import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {CartHomeService} from "../cart-home.service";
import {SEOService} from "../../seo.service";
import {tap} from "rxjs/operators";
import {Category} from "../../models/category";

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.scss']
})
export class CartHomeComponent implements OnInit {
  id: string;
  category$: Observable<Category>;
  test;

  constructor(private activateRoute: ActivatedRoute,
              private cartHomeService: CartHomeService,
              private seoService: SEOService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.category$ = this.cartHomeService.getPageDescription(this.id)
      .pipe(
        tap((category: Category) => {
          if (!category) {
            this.router.navigate(['/404']);
          }
          this.seoService.setSeoData(category.name, {
            description: category.metaDescription,
            keywords: category.metaKeywords
          });
        }),
      );
  }
}
