import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        keywords: 'some, keywords, here, separated, by, a comma'
      }
    },
    children: [
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
            keywords: 'some, keywords, here, separated, by, a comma'
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
