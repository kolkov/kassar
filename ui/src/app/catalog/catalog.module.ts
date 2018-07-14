import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogRoutingModule} from './catalog-routing.module';
import {CatalogHomeComponent} from './catalog-home/catalog-home.component';
import {CartHomeComponent} from './cart-home/cart-home.component';
import {CartDetailsComponent} from './cart-details/cart-details.component';
import {CatalogComponent} from "./catalog.component";
import {SharedModule} from "../shared/shared.module";
import { AccessoriesComponent } from './cart-details/accessories/accessories.component';
import { ReviewsComponent } from './cart-details/reviews/reviews.component';
import { QuestionAnswerComponent } from './cart-details/question-answer/question-answer.component';
import { DescriptionComponent } from './cart-details/description/description.component';
import { CustomerReviewsComponent } from './cart-details/customer-reviews/customer-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
  ],
  declarations: [
    CatalogComponent,
    CatalogHomeComponent,
    CartHomeComponent,
    CartDetailsComponent,
    AccessoriesComponent,
    ReviewsComponent,
    QuestionAnswerComponent,
    DescriptionComponent,
    CustomerReviewsComponent
  ]
})
export class CatalogModule {
}
