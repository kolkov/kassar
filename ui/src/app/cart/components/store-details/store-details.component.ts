import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Observer} from "rxjs/internal/types";
import {Product} from "../../models/product";
import {catchError, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {
  product$: Observable<Product>;
  @Input() id: string;
  @Output('product') product = new EventEmitter<Product>();

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) {
  }

  ngOnInit() {
      this.product$ = this.productService.one(this.id).pipe(
        tap(
          p => {
           this.product.emit(p)
          }
        ),
        catchError((err, caught) => {
          this.router.navigate(['/404']);
          return caught;
        })
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
          obs.next(cart.items.some((i) => i.product_id === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }
}
