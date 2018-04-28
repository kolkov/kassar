import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./notfound/not-found.component";
import {EquipmentComponent} from "./equipment/equipment.component";
import {MainComponent} from "./main/main.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NewsComponent} from "./news/news.component";
import {ServicesComponent} from "./services/services.component";
import {Kassatka7Component} from "./equipment/kassatka7/kassatka7.component";
import {EquipmentMainComponent} from "./equipment/main/main.component";
import {EquipmentHomeComponent} from "./equipment/equipment-home/equipment-home.component";
import {KassatkaMiniComponent} from "./equipment/kassatka-mini/kassatka-mini.component";
import {Kassatka10Component} from "./equipment/kassatka10/kassatka10.component";

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
    /* children: [

     path: '',
     component: EquipmentMainComponent,*/
        children: [
          {
            path: 'kassatka-7',
            component: Kassatka7Component,
          },
          {
            path: 'kassatka-mini',
            component: KassatkaMiniComponent,
          },
          {
            path: 'kassatka-10',
            component: Kassatka10Component,
          },
          {
            path: '',
            component: EquipmentHomeComponent,

          }
        ]
      /*}
    ]*/
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
export class AppRoutingModule {}
