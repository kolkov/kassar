import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./catalog.component";
import {CatalogHomeComponent} from "./catalog-home/catalog-home.component";
import {CartHomeComponent} from "./cart-home/cart-home.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";

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
        /*resolve: {
          details: CatalogResolver
        }*/
      },
      {
        path:':id',
        component: CartHomeComponent
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
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
