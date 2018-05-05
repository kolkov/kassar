import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../cart/services/products.service";
import {Product} from "../../cart/models/product";
import {Observable} from "rxjs/internal/Observable";
import {Observer} from "rxjs/internal/types";
import {ShoppingCartService} from "../../cart/services/shopping-cart.service";
import {SEOService} from "../../seo.service";
import {tap} from "rxjs/operators";

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit, AfterViewInit {
  id: string;
  product$: Observable<Product>;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private seoService: SEOService) { }

  ngOnInit() {
    //this.shoppingCartService.category = this.activateRoute.parent.toString();
    this.activateRoute.params.subscribe(x => {
      this.id = this.activateRoute.snapshot.params['id'];
      this.product$= this.productService.one1(this.id).pipe(
        tap(p => this.seoService.setSeoData(p.name, {}))
      );

    });

    //this.product$= this.productService.one1(this.id);
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
          obs.next(cart.items.some((i) => i.productId === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(){
    console.log("TEST!!!!!")
  }
}
