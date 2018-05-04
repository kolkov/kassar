import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product, ProductList} from "../../models/product";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsService} from "../../services/products.service";
import {Observer} from "rxjs/internal/types";
import {filter, map, tap} from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.scss']
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.products = this.productsService.all().pipe(
      tap(x => console.log('Tap activated!')),
      filter(x => x.total_count > 1),
      map(x => x.items)
    );
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
}
