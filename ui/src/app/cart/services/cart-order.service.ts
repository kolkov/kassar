import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {CartItem} from "../models/cart-item";
import {CartInput} from "../components/order-complete/order-complete.component";


@Injectable({
  providedIn: 'root'
})
export class CartOrderService {

  constructor(private http: HttpClient) {
  }

  save(data: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(data);
    /*const body = JSON.stringify({
      customer_id: 1,
      registered: true,
      payment_type: 1,
      items: [
        {
          order_id: 1,
          product_id: 1,
          quantity: 2,
        }
      ]
    });*/
    return this.http.post<any>('v1/orders', body, {headers: headers});
  }


}
