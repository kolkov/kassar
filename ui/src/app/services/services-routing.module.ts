import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent as ServiceHomeComponent} from "./home/home.component";
import {PricelistComponent} from "./pricelist/pricelist.component";
import {ServicesComponent} from "./services.component";

const routes: Routes = [
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
        component: ServiceHomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
