import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsService} from "../../services/products.service";
import {Observer} from "rxjs/internal/types";
import {map} from "rxjs/operators";
import {NgxMetrikaService} from "../../../../../projects/kolkov/ngx-metrika/src/lib/ngx-metrika.service";
import {CommonOptions} from "../../../../../projects/kolkov/ngx-metrika/src/lib/interfaces";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.scss']
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;

  @Input() category: string;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private ym: NgxMetrikaService) {
  }

  ngOnInit() {
    this.shoppingCartService.category = this.category;
    this.products = this.productsService.allByPath(this.category).pipe(
      map(x => x.items)
    );
  }

  public addProductToCart(product: Product): void {
    function goalCallback() {
      console.log("request to Metrika sent successfully");
    }
    const options: CommonOptions = {
      params: {
        productId: product.id,
        productName: product.name
      },
      callback: goalCallback
    };
    this.ym.reachGoal.next({target: "ADD_TO_CART", options});
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
