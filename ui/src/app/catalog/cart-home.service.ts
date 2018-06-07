import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {Category, CategoryList} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CartHomeService {

  categories: Category[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getList()
  }

  getList() {
    return this.http.get<CategoryList>("v1/public/product-categories").pipe(
      tap(x => this.categories = x.items)
    );
  }

  getById(id: number) {
    return this.http.get("v1/public/product-categories/" + id)
  }

  getByPath(path: string) {
    return this.http.get<Category>("v1/public/product-category/" + path)
      .pipe(
        map(x => x.path === path),
        catchError((e: HttpErrorResponse) => {
          this.router.navigate(['404']);
          return of(e.status == 404)
        }))
  }

  checkPath(path: string) {
    return this.categories.find(x => x.path === path)
  }

  getPageDescription(id: string): Observable<Category> {
    if (this.categories.length != 0) return new Observable<Category>((observer) => {
      observer.next(this.categories.find(x => x.path == id));
    });
    else {
      return this.getList().pipe(
        map(() => {
          return this.categories.find(x => x.path == id)
        }));
    }
  }
}
