import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

let count = 0;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private products: Observable<Product[]>;

  constructor(private http: HttpClient) { }

  public all(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json')
  }
}
