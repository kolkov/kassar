import { Injectable } from '@angular/core';
import {AdditionalOption} from "../models/additional-option";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PaymentOption} from "../models/payment-option";

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsService {
  constructor(private http: HttpClient) { }

  public all(): Observable<PaymentOption[]> {
    return this.http.get<PaymentOption[]>('assets/payment-options.json');
  }
}