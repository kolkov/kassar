import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {CollectionViewer} from "@angular/cdk/collections";
import {Observable} from "rxjs/internal/Observable";
import {OrdersService} from "./orders.service";
import {MatPaginator} from "@angular/material";
import {Order, OrderList, OrderListItem} from "./order";


export class OrdersDataSource implements DataSource<OrderListItem> {

  private ordersSubject = new BehaviorSubject<OrderListItem[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private _paginator: MatPaginator|null;

  constructor(private ordersService: OrdersService) {

  }

  loadOrders(categoryId: number,
               filter: string,
               sortDirection: string,
               pageIndex: number,
               pageSize: number) {

    this.loadingSubject.next(true);

    this.ordersService.findOrders(categoryId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((ordersList: OrderList) => {
        this.ordersSubject.next(ordersList.items);
        this._updatePaginator(ordersList.total_count);
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

  connect(collectionViewer: CollectionViewer): Observable<OrderListItem[]> {
    console.log("Connecting data source");
    return this.ordersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ordersSubject.complete();
    this.loadingSubject.complete();
  }
}

