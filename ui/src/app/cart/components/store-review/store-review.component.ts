import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-store-review',
  templateUrl: './store-review.component.html',
  styleUrls: ['./store-review.component.scss']
})
export class StoreReviewComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.productId$.subscribe( x => {
      console.log("ProductId:", x);
    });
  }

}
