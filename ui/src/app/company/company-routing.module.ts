import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyHomeComponent} from "./company-home/company-home.component";
import {CompanyComponent} from "./company.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NewsComponent} from "./news/news.component";

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    data: {
      title: 'О нас',
      metatags: {
        description: 'Все о нашей компании',
        keywords: 'о компании, кассар, все о компании, ооо кассар'
      },
      breadcrumb: 'О нас'
    },
    children: [
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'О нас',
          metatags: {
            description: 'Данные о компании Кассар',
            keywords: 'кассар, about, о нас, о компании, компания, историякомпании'
          },
          breadcrumb: 'О компании'
        }
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
        path: 'news',
        component: NewsComponent,
        data: {
          title: 'Новости',
          metatags: {
            description: 'Новости нашей компании',
            keywords: 'новости, новости компании, наши новости, последние новости, новости кассар'
          }
        }
      },
      {
        path: '',
        component: CompanyHomeComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
