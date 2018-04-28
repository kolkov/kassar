import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./notfound/not-found.component";
import {EquipmentComponent} from "./equipment/equipment.component";
import {MainComponent} from "./main/main.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NewsComponent} from "./news/news.component";
import {ServicesComponent} from "./services/services.component";
import {Kassatka7Component} from "./equipment/kkt/kassatka7/kassatka7.component";
import {EquipmentHomeComponent} from "./equipment/equipment-home/equipment-home.component";
import {KassatkaMiniComponent} from "./equipment/kkt/kassatka-mini/kassatka-mini.component";
import {Kassatka10Component} from "./equipment/kkt/kassatka10/kassatka10.component";
import {KktComponent} from "./equipment/kkt/kkt.component";
import {KktHomeComponent} from "./equipment/kkt/kkt-home/kkt-home.component";
import {PricelistComponent} from "./services/pricelist/pricelist.component";
import {HomeComponent} from "./services/home/home.component";
import {ScannersComponent} from "./equipment/scanners/scanners.component";
import {ScannersHomeComponent} from "./equipment/scanners/scanners-home/scanners-home.component";

const appRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'О нас',
      metatags: {
        description: 'Все о нашей компании',
        keywords: 'some, keywords, here, separated, by, a comma'
      }
    }
  },
  {
    path: 'news',
    component: NewsComponent,
    data: {
      title: 'Новости',
      metatags: {
        description: 'Новости нашей компании',
        keywords: 'some, keywords, here, separated, by, a comma'
      }
    }
  },
  {
    path: 'equipment',
    component: EquipmentComponent,
    data: {
      title: 'Оборудование',
      metatags: {
        description: 'Предлагаемое оборудование',
        keywords: 'some, keywords, here, separated, by, a comma'
      }
    },
    children: [
      {
        path: 'kontrolno-kassovaya-tekhnika',
        component: KktComponent,
        data: {
          title: 'Контрольно-кассовая техника',
          metatags: {
            description: 'Раздел контрольно кассовой техники',
            keywords: 'some, keywords, here, separated, by, a comma'
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
                keywords: 'some, keywords, here, separated, by, a comma'
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
        path: '',
        component: EquipmentHomeComponent
      }
    ]
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Услуги',
      metatags: {
        description: 'Услуги, оказываемые нашей компанией',
        keywords: 'services, услуги, что мы можем, оказание, установка'
      }
    },
    children: [
      {
        path: 'pricelist',
        component: PricelistComponent,
        data: {
          title: 'Прайслист',
          metatags: {
            description: 'Наши цены',
            keywords: ''
          }
        }
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      title: 'Контакты',
      metatags: {
        description: 'Как с нами связаться',
        keywords: 'адрес, телефон, связаться'
      }
    }
  },
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
    data: {
      title: 'Установка, обслуживание и сервис контрольно-кассовой техники в Москве',
      metatags: {
        description: 'Мы занимаемся поставками ККТ, настройкой под ключ кассового оборудования и сервисным обсуживанием',
        keywords: 'касса, онлайн-касса, ккт, обслуживание, установка, сервис'
      }
    }
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
