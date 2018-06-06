import {Component, OnInit} from '@angular/core';

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
