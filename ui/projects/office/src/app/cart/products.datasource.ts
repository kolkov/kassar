import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {CollectionViewer} from "@angular/cdk/collections";
import {Observable} from "rxjs/internal/Observable";
import {ProductsService} from "./products.service";
import {MatPaginator} from "@angular/material";
import {Product, ProductList} from "../../../../../src/app/cart/models/product";


export class ProductsDataSource implements DataSource<Product> {

  private productsSubject = new BehaviorSubject<Product[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private _paginator: MatPaginator|null;

  constructor(private productsService: ProductsService) {

  }

  loadProducts(categoryId: number,
               filter: string,
               sortDirection: string,
               pageIndex: number,
               pageSize: number) {

    this.loadingSubject.next(true);

    this.productsService.findProducts(categoryId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((productsList: ProductList) => {
        this.productsSubject.next(productsList.items);
        this._updatePaginator(productsList.total_count);
      });
  }

  get paginator(): MatPaginator | null { return this._paginator; }
  set paginator(paginator: MatPaginator|null) {
    this._paginator = paginator;
    // this._updateChangeSubscription();
  }

  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      if (!this.paginator) { return; }

      this.paginator.length = filteredDataLength;

      // If the page index is set beyond the page, reduce it to the last page.
      if (this.paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
        this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
      }
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    console.log("Connecting data source");
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }
}

