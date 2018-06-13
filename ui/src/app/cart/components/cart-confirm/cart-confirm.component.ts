import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCart} from "../../models/shopping-cart";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Product} from "../../models/product";
import {ProductsService} from "../../services/products.service";
import {CartItem} from "../../models/cart-item";
import {DeliveryOption} from "../../models/dilivery-option";
import {tap} from "rxjs/operators";

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-cart-confirm',
  templateUrl: './cart-confirm.component.html',
  styleUrls: ['./cart-confirm.component.scss']
})
export class CartConfirmComponent implements OnInit {
  cart: ShoppingCart;

  public cartItems: ICartItemWithProduct[];

  public itemCount: number;
  private products: Product[];

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService,
              private productsService: ProductsService,) {
  }

  ngOnInit() {
    this.shoppingCartService.get().subscribe((cart) => {
      this.cart = cart;
      //console.dir(this.cart);
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products.items;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p.id === item.product_id);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity,

            };
          });
      });
    });
  }

  setSMSOption(option: boolean): void {
    this.shoppingCartService.setSMSOption(option);
  }

  setCallOption(option: boolean): void {
    this.shoppingCartService.setCallOption(option);
  }

  saveNote(note: string){
    this.shoppingCartService.saveNote(note);
  }

  confirmedCart() {
    this.router.navigate(['/order/complete'], {replaceUrl: false});
  }
}
