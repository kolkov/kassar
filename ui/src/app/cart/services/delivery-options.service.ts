import {Injectable} from '@angular/core';
import {DeliveryOption} from "../models/dilivery-option";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliveryOptionsService {
  //private deliveryOptions: Observable<DeliveryOption[]>;

  constructor(private http: HttpClient) {
  }

  public all(): Observable<DeliveryOption[]> {
    return this.http.get<DeliveryOption[]>('v1/public/delivery-options');
  }
}
