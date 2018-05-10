import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Router} from "@angular/router";
import {CartOrderService} from "../../services/cart-order.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";

export interface CartInputItem {
  //order_id: number,
  product_id: number,
  quantity: number,
}

export interface CartInput {
  customer_id: number,
  registered: boolean,
  payment_type: number,
  items: CartInputItem[]
}

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  cart: CartInput;
  id$: Observable<number>;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private cartOrderService: CartOrderService) {
  }

  ngOnInit() {
    this.shoppingCartService.get().pipe(
      map(x => {
          this.cart = {
            customer_id: 1,
            registered: false,
            payment_type: 1,
            items: x.items,
          };
        }
      )).subscribe();
    this.id$ = this.cartOrderService.save(this.cart).pipe(
      map(x => x.id
      ));
    this.shoppingCartService.empty();
  }

  gotoCart() {
    this.router.navigate(['/catalog'], {replaceUrl: true});
  }

}
