import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ProductsService} from "../cart/services/products.service";
import {Product} from "../cart/models/product";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class CatalogResolver implements Resolve<Product> {

  constructor(private productService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.productService.one(route.params['id']);
  }
}
