import { Component, OnInit } from '@angular/core';
import {AdditionalOptionsService} from "../../services/additional-options.service";
import {DeliveryOption} from "../../models/dilivery-option";
import {AdditionalOption} from "../../models/additional-option";
import {ShoppingCart} from "../../models/shopping-cart";
import {Observable} from "rxjs/internal/Observable";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {PaymentOption} from "../../models/payment-option";
import {PaymentOptionsService} from "../../services/payment-options.service";

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
  public paymentOptions: Observable<PaymentOption[]>;
  public cart: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService,
              private paymentOptionService: PaymentOptionsService,
              private router: Router) { }

  ngOnInit() {
    this.paymentOptions = this.paymentOptionService.all();
    this.cart = this.shoppingCartService.get();
  }

  setPaymentOption(option: PaymentOption): void {
    this.shoppingCartService.setPaymentOption(option);
  }

  confirmedCart(){
    this.router.navigate(['/order/confirm'], { replaceUrl: true });
  }
}
