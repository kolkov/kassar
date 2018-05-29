import {Component, OnInit} from '@angular/core';
import {Category} from "./cart-home.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  test;

  constructor(/*private activateRoute: ActivatedRoute*/) { }

  ngOnInit() {
    /*this.activateRoute.data
      .subscribe((data: { categories: Category }) => {
        this.test = data.categories.path;

      });*/
  }

}
