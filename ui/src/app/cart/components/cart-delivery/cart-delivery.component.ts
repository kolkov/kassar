import { Component, OnInit } from '@angular/core';
import {DeliveryOption} from "../../models/dilivery-option";
import {Observable} from "rxjs/internal/Observable";
import {DeliveryOptionsService} from "../../services/delivery-options.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";
import {Router} from "@angular/router";
import {Customer} from "../../models/customer";

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  /*public first_name: string;
  public last_name: string;*/
  model: Customer = new Customer("","", "", "");

  constructor(private shoppingCartService: ShoppingCartService,
              private deliveryOptionService: DeliveryOptionsService,
              private router: Router) { }

  ngOnInit() {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
  }

  setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  confirmedCart(){
    this.shoppingCartService.setCustomerRequisites(this.model);
    this.router.navigate(['/order/payment'], { replaceUrl: false });
  }
}
