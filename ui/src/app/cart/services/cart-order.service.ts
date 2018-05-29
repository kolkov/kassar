import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCart} from "../models/shopping-cart";


@Injectable({
  providedIn: 'root'
})
export class CartOrderService {

  constructor(private http: HttpClient) {
  }

  save(data: ShoppingCart): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(data);
    return this.http.post<any>('v1/public/orders', body, {headers: headers});
  }


}
