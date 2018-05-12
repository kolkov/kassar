import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../cart/services/products.service";
import {Product} from "../../cart/models/product";
import {Observable} from "rxjs/internal/Observable";
import {Observer} from "rxjs/internal/types";
import {ShoppingCartService} from "../../cart/services/shopping-cart.service";
import {SEOService} from "../../seo.service";
import {catchError, tap} from "rxjs/operators";

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  product$: Observable<Product>;
  private id: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private seoService: SEOService,
    private router: Router
  ) {
  }

  ngOnInit() {
    /*this.product$ = this.activateRoute.snapshot.data['details'];

    this.activateRoute.params.subscribe(x => {
      this.id = this.activateRoute.snapshot.params['id'];
      this.product$= this.activateRoute.snapshot.data['details'].pipe()(
        tap(p => this.seoService.setSeoData(p.name, {}))
      );
    });*/

    this.activateRoute.params.subscribe(() => {
      this.id = this.activateRoute.snapshot.params['id'];
      this.product$ = this.productService.one(this.id).pipe(
        tap(
          p => {
            this.seoService.setSeoData(p.name, {description: p.tag_description, keywords: p.keywords})
          }
        ),
        catchError((err, caught) => {
          this.router.navigate(['/404']);
          return caught;
        })
      );
    });
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.product_id === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }
}
