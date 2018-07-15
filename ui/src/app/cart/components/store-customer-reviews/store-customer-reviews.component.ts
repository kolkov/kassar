import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-store-customer-reviews',
  templateUrl: './store-customer-reviews.component.html',
  styleUrls: ['./store-customer-reviews.component.scss']
})
export class StoreCustomerReviewsComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.productId$.subscribe( x => {
      console.log("ProductId:", x);
    });
  }
}
