import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AdditionalOption} from "../models/additional-option";

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionsService {
  constructor(private http: HttpClient) { }

  public all(): Observable<AdditionalOption[]> {
    return this.http.get<AdditionalOption[]>('assets/additional-options.json');
  }
}
