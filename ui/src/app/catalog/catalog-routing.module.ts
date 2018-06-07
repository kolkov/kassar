import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./catalog.component";
import {CatalogHomeComponent} from "./catalog-home/catalog-home.component";
import {CartHomeComponent} from "./cart-home/cart-home.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";
import {CatalogGuard} from "./catalog.guard";

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    /*resolve: {
      categories: CategoryResolverService
    },*/
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
