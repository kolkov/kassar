import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ShoppingCart} from "../../models/shopping-cart";
import {Observable} from "rxjs/internal/Observable";
import {ProductList} from "../../models/product";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsService} from "../../services/products.service";
import {Router} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @Input() category: string;

  public products: Observable<ProductList>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  id: string;

  private cartSubscription: Subscription;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  ngOnInit() {
    this.products = this.productsService.all("");
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  ngOnDestroy(){
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  emptyCart(): void {
    this.shoppingCartService.empty();
  }
}
