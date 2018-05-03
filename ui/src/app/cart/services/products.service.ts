import { Injectable } from '@angular/core';
import {Product, ProductList} from "../models/product";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public all(): Observable<ProductList> {
    return this.http.get<ProductList>('v1/products')
  }
}
