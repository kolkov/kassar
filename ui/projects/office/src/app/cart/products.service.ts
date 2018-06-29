import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Category, CategoryList} from "../../../../../src/app/models/category";
import {Product, ProductList} from "../../../../../src/app/cart/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getList(): Observable<ProductList> {
    return this.http.get<ProductList>("v1/products");
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>("v1/products/" + id);
  }

  save(product) {
    const body = JSON.stringify(product);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (product.id !== 0) {
      return this.http.patch('v1/products/' + product.id, body, {headers});
    } else {

      return this.http.post('v1/products', body, {headers});
    }
  }

  findProducts(
    categoryId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<ProductList> {

    return this.http.get<ProductList>('v1/products', {
      params: new HttpParams()
        .set('categoryId', categoryId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('per_page', pageSize.toString())
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<CategoryList>("v1/public/product-categories")
      .pipe(
        map( (x: CategoryList) => x.items));
  }
}
