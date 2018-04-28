import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./notfound/not-found.component";
import {EquipmentComponent} from "./equipment/equipment.component";
import {MainComponent} from "./main/main.component";
import {ContactsComponent} from "./contacts/contacts.component";

const appRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'О нас',
      metatags: {
        description: 'Page Description or some content here',
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
        description: 'Page Description or some content here',
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
        description: 'Page Description or some content here',
        keywords: 'some, keywords, here, separated, by, a comma'
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
