import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Observer} from "rxjs/internal/types";

@Injectable()
export class PopulatedCartGuard implements CanActivate {

  public constructor(private router: Router,
                     private shoppingCartService: ShoppingCartService) { }

  public canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const cartSubscription = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          if (cart.items.length === 0) {
            observer.next(false);
            alert("Ваша корзина пуста!");
            this.router.navigate(["/catalog"]);
          } else {
            observer.next(true);
          }
        });
      return () => cartSubscription.unsubscribe();
    });
  }
}
