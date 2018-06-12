import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Router} from "@angular/router";
import {CartOrderService} from "../../services/cart-order.service";
import {catchError, map, tap} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCart} from "../../models/shopping-cart";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {Location} from "@angular/common";

export interface CartInputItem {
  product_id: number,
  quantity: number,
}

export interface CartOutput {
  customer_id: number,
  registered: boolean,
  payment_type: number,
  items: CartInputItem[]
}

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {
  cart: ShoppingCart;
  id$: Observable<number>;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private _location: Location,
              private cartOrderService: CartOrderService) {
  }

  ngOnInit() {
    this.shoppingCartService.get().pipe(
      tap(x => this.cart = x
      )).subscribe();
    this.id$ = this.cartOrderService.save(this.cart).pipe(
      tap(() => this.shoppingCartService.empty(),
        err => {
          alert(err.toString());
          this._location.back();
        } ),
      map(x => x.id),
      // catchError(this.errorFn)
      );
  }

  gotoCart() {
    this.router.navigate(['/catalog'], {replaceUrl: false});
  }

  /*errorFn(e: HttpErrorResponse){
    alert("Ошибка оформления заказа! :( Попробуйте позже или позвоните нам.");
    return throwError('Ошибка оформления заказа! :( Попробуйте позже или позвоните нам.');
  }*/
}
