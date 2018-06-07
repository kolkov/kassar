import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PaymentOption} from "../models/payment-option";

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsService {
  constructor(private http: HttpClient) {
  }

  public all(): Observable<PaymentOption[]> {
    return this.http.get<PaymentOption[]>('v1/public/payment-options');
  }
}
