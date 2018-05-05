import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  ngOnInit() {
    this.shoppingCartService.empty();
  }

  gotoCart(){
    this.router.navigate(['/catalog'], { replaceUrl: true });
  }

}
