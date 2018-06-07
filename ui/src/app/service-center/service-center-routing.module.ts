import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceCenterComponent} from "./service-center.component";
import {ServiceCenterHomeComponent} from "./service-center-home/service-center-home.component";

const routes: Routes = [
  {
    path: 'service-center',
    component: ServiceCenterComponent,
    data: {},
    children: [
      {
        path: '',
        component: ServiceCenterHomeComponent,
        data: {
          title: 'Сервисный центр',
          metatags: {
            description: 'Сервисное обслуживание контрольно-кассовой техники',
            keywords: 'касса, онлайн-касса, ккт, обслуживание, установка, сервисный центр'
          },
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCenterRoutingModule {
}
