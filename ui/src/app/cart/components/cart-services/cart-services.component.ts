import { Component, OnInit } from '@angular/core';
import {DeliveryOption} from "../../models/dilivery-option";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";
import {AdditionalOption} from "../../models/additional-option";
import {AdditionalOptionsService} from "../../services/additional-options.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-services',
  templateUrl: './cart-services.component.html',
  styleUrls: ['./cart-services.component.scss']
})
export class CartServicesComponent implements OnInit {
  public additionalOptions: Observable<AdditionalOption[]>;
  public cart: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService,
              private additionalOptionService: AdditionalOptionsService,
              private router: Router) { }

  ngOnInit() {
    this.additionalOptions = this.additionalOptionService.all();
    this.cart = this.shoppingCartService.get();
  }

  setAdditionalOption(option: DeliveryOption): void {
    this.shoppingCartService.setAdditionalOption(option);
  }

  confirmedCart(){
    this.router.navigate(['/order/delivery'], { replaceUrl: false });
  }
}
