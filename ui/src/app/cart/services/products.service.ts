import { Injectable } from '@angular/core';
import {Product, ProductList} from "../models/product";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  categorys = {
    "kontrolno-kassovaya-tekhnika": 1,
    "skanery-shtrikh-kodov": 2,
    "prochee": 3
  };
  path:string;

  constructor(private http: HttpClient) { }

  public all(categoryName: string): Observable<ProductList> {
    this.path = categoryName;
    const id = this.categorys[categoryName];
    const options = id ?
      { params: new HttpParams().set('id', id) } : {};
    return this.http.get<ProductList>('v1/products', options).pipe(
      catchError(this.handleError)
    );
  }

  public one1(id: string): Observable<Product> {
    console.log(id);
    return this.http.get<Product>('v1/products/' + id).pipe(
      tap(x => console.log(id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
