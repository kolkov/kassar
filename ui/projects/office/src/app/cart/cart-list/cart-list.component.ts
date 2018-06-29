import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../products.service";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {MatPaginator, MatSort} from "@angular/material";
import {ProductsDataSource} from "../products.datasource";
import {Router} from "@angular/router";
import {merge} from "rxjs/internal/observable/merge";
import {fromEvent} from "rxjs";
import {Product} from "../../../../../../src/app/cart/models/product";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, AfterViewInit {

  categoryId = 0;

  products: Product[];
  dataSource: ProductsDataSource;

  displayedColumns = ['id', 'title'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.dataSource = new ProductsDataSource(this.productsService);
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadProducts(this.categoryId, '', 'desc', 0, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadProductsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProductsPage())
      )
      .subscribe();

  }

  loadProductsPage() {
    this.dataSource.loadProducts(
      this.categoryId,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }
}
