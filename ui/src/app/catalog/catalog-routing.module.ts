import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./catalog.component";
import {CatalogHomeComponent} from "./catalog-home/catalog-home.component";
import {Kassatka7Component} from "./kkt/kassatka7/kassatka7.component";
import {Kassatka10Component} from "./kkt/kassatka10/kassatka10.component";
import {KassatkaMiniComponent} from "./kkt/kassatka-mini/kassatka-mini.component";
import {KktHomeComponent} from "./kkt/kkt-home/kkt-home.component";
import {ScannersHomeComponent} from "./scanners/scanners-home/scanners-home.component";
import {OtherComponent} from "./other/other.component";
import {KktComponent} from "./kkt/kkt.component";
import {ScannersComponent} from "./scanners/scanners.component";
import {OtherHomeComponent} from "./other/other-home/other-home.component";
import {CartHomeComponent} from "./cart-home/cart-home.component";

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    data: {
      title: 'Каьалог оборудования',
      metatags: {
        description: 'Предлагаемое оборудование',
        keywords: ''
      }
    },
    children: [
      {
        path:':id',
        component: CartHomeComponent
      },
      {
        path: '',
        component: CatalogHomeComponent
      }
    ]
    /*children: [
      {
        path: 'kontrolno-kassovaya-tekhnika',
        component: KktComponent,
        data: {
          title: 'Контрольно-кассовая техника',
          metatags: {
            description: 'Раздел контрольно кассовой техники',
            keywords: ''
          }
        },
        children: [
          {
            path: 'kassatka-7',
            component: Kassatka7Component,
            data: {
              title: 'Кассатка 7',
              metatags: {
                description: 'Удобная касса для малых предприятий',
                keywords: 'кассатка, кассатка 7, ккт, касса'
              }
            }
          },
          {
            path: 'kassatka-mini',
            component: KassatkaMiniComponent,
            data: {
              title: 'Кассатка mini',
              metatags: {
                description: 'Удобная касса для курьеров',
                keywords: ''
              }
            }
          },
          {
            path: 'kassatka-10',
            component: Kassatka10Component,
            data: {
              title: 'Кассатка 10',
              metatags: {
                description: 'Касса для магазинов и кафе',
                keywords: ''
              }
            }
          },
          {
            path: '',
            component: KktHomeComponent,
          }
        ]
      },
      {
        path: 'skanery-shtrikh-kodov',
        component: ScannersComponent,
        data: {
          title: 'Сканнеры штрих кодов',
          metatags: {
            description: 'Сканнеры штрих кодов',
            keywords: ''
          }
        },
        children: [
          {
            path: 'Honeywell-1450g',
            component: Kassatka7Component,
            data: {
              title: 'Кассатка 7',
              metatags: {
                description: 'Honeywell 1450g',
                keywords: 'кассатка, кассатка 7, ккт, касса'
              }
            }
          },
          {
            path: '',
            component: ScannersHomeComponent
          }
        ]
      },
      {
        path: 'prochee',
        component: OtherComponent,
        data: {
          title: 'Прочее',
          metatags: {
            description: 'Раздел прочей техники и оборудования',
            keywords: ''
          }
        },
        children: [
          {
            path: '',
            component: OtherHomeComponent
          }

        ]
      },
      {
        path: '',
        component: CatalogHomeComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
