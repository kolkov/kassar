import {Injectable} from '@angular/core';
import {Product, ProductList} from "../models/product";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  path: string;
  productId$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  public all(): Observable<ProductList> {
    return this.http.get<ProductList>('v1/public/products').pipe(
      catchError(this.handleError)
    );
  }

  public allByPath(categoryName: string): Observable<ProductList> {
    this.path = categoryName;
    const options = categoryName ?
      {params: new HttpParams().set('path', categoryName)} : {};
    return this.http.get<ProductList>('v1/public/products-by-path', options).pipe(
      catchError(this.handleError)
    );
  }


  public one(path: string): Observable<Product> {
    return this.http.get<Product>('v1/public/products/' + path).pipe(
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
