import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./catalog.component";
import {CatalogHomeComponent} from "./catalog-home/catalog-home.component";
import {CartHomeComponent} from "./cart-home/cart-home.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";
import {CatalogGuard} from "./catalog.guard";
import {AccessoriesComponent} from "./cart-details/accessories/accessories.component";
import {DescriptionComponent} from "./cart-details/description/description.component";
import {ReviewsComponent} from "./cart-details/reviews/reviews.component";
import {CustomerReviewsComponent} from "./cart-details/customer-reviews/customer-reviews.component";
import {QuestionAnswerComponent} from "./cart-details/question-answer/question-answer.component";

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    data: {
      title: 'Каталог оборудования',
      metatags: {
        description: 'Предлагаемое оборудование',
        keywords: ''
      }
    },
    children: [
      {
        path: ':id/:id',
        component: CartDetailsComponent,
        children: [
          {
            path: 'accessories',
            component: AccessoriesComponent,

          },
          {
            path: 'reviews',
            component: ReviewsComponent,

          },
          {
            path: 'customer-reviews',
            component: CustomerReviewsComponent,

          },
          {
            path: 'question-answer',
            component: QuestionAnswerComponent,

          },
          {
            path: '',
            component: DescriptionComponent,
            pathMatch: 'full',
          },
        ]
      },
      {
        path: ':id',
        component: CartHomeComponent,
        canActivate: [CatalogGuard],
      },
      {
        path: '',
        component: CatalogHomeComponent,
        data: {
          title: 'Каталог оборудования',
          metatags: {
            description: 'Предлагаемое оборудование и программное обеспечение. Онлайн кассы, банковские терминалы, сканеры трих кодов.',
            keywords: 'ккт, онлайн кассы, оборудование, прогаммы, каталог'
          }
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CatalogGuard]
})
export class CatalogRoutingModule {
}
