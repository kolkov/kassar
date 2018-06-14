import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../cart/models/product";
import {SEOService} from "../../seo.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  product: EventEmitter<Product>;
  id: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private seoService: SEOService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(() => {
      this.id = this.activateRoute.snapshot.params['id'];
      this.changeDetectorRef.detectChanges();
    });
  }

  myProduct(p: Product){
    this.seoService.setSeoData(p.name, {description: p.metaDescription, keywords: p.metaKeywords})
  }
}
