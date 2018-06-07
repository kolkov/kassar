import {Component, Input, OnInit} from '@angular/core';
import {CartHomeService} from "../../../catalog/cart-home.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.scss']
})
export class StoreCatalogComponent implements OnInit {
  categories$;

  @Input() baseUrl = '';

  constructor(private catalogService: CartHomeService) {
  }

  ngOnInit() {
    this.categories$ = this.catalogService.getList().pipe(
      map(x => x.items)
    );
  }

}
