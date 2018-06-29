import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatPaginator, MatSort} from "@angular/material";
import {OrdersService} from "../../orders/orders.service";
import {Order} from "../../../../../../src/app/cart/models/order";
import {Router} from "@angular/router";
import {merge} from "rxjs/internal/observable/merge";
import {OrdersDataSource} from "../../orders/orders.datasource";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, AfterViewInit {

  categoryId = 0;

  orders: Order[];
  dataSource: OrdersDataSource;

  displayedColumns = ['id', 'title'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private ordersService: OrdersService,
              private router: Router) { }

  ngOnInit() {
    this.dataSource = new OrdersDataSource(this.ordersService);
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadOrders(this.categoryId, '', 'desc', 0, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadOrdersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadOrdersPage())
      )
      .subscribe();

  }

  loadOrdersPage() {
    this.dataSource.loadOrders(
      this.categoryId,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }
}
