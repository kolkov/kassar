import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Product} from "../../models/product";
import {ShoppingCart} from "../../models/shopping-cart";
import {Observable} from "rxjs/internal/Observable";
import {CartItem} from "../../models/cart-item";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ProductsService} from "../../services/products.service";
import {Router} from "@angular/router";
import {Observer} from "rxjs/internal/types";

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  //public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;
  //public confirmed1: boolean;

  private products: Product[];
  private cartSubscription: Subscription;

  constructor(private productsService: ProductsService,
              //private deliveryOptionService: DeliveryOptionsService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    //this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all("").subscribe((products) => {
        this.products = products.items;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.product_id);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  confirmedCart() {
    this.router.navigate(['/order/services'], {replaceUrl: false});
  }

  emptyCart(): void {
    this.shoppingCartService.empty();
  }

  setConfirmation(value: boolean): void {
    this.shoppingCartService.setConfirmation(value);
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
