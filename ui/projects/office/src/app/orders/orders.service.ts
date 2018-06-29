import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Category, CategoryList} from "../../../../../src/app/models/category";
import {Order, OrderList} from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getList(): Observable<OrderList> {
    return this.http.get<OrderList>("v1/orders");
  }

  getOne(id: string): Observable<Order> {
    return this.http.get<Order>("v1/orders/" + id);
  }

  save(order) {
    const body = JSON.stringify(order);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (order.id !== 0) {
      return this.http.patch('v1/orders/' + order.id, body, {headers});
    } else {

      return this.http.post('v1/orders', body, {headers});
    }
  }

  findOrders(
    categoryId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<OrderList> {

    return this.http.get<OrderList>('v1/orders', {
      params: new HttpParams()
        .set('categoryId', categoryId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('per_page', pageSize.toString())
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<CategoryList>("v1/public/order-categories")
      .pipe(
        map( (x: CategoryList) => x.items));
  }
}
