import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./notfound/not-found.component";
import {HomeComponent} from "./home/home.component";
import {environment} from "../environments/environment";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: {
      title: 'Установка, обслуживание и сервис контрольно-кассовой техники в Москве',
      metatags: {
        description: 'Мы занимаемся поставками ККТ, настройкой под ключ кассового оборудования, онлайн кассами и сервисным обсуживанием',
        keywords: 'касса, онлайн-касса, ккт, обслуживание, установка, сервис'
      },
      breadcrumb: 'forms'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      breadcrumb: 'not found'
    }

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: environment.enableTracing}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
