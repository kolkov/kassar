import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ShoppingCart} from "../models/shopping-cart";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CartOrderService {

  constructor(private http: HttpClient) {
  }

  save(data: ShoppingCart): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(data);
    return this.http.post<any>('v1/public/orders', body, {headers: headers}).pipe(
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
      'Что-то пошло не так; Пожалуйста попробуйте позже или позвоните.');
  };
}
