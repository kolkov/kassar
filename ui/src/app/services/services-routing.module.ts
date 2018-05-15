import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent as ServiceHomeComponent} from "./home/home.component";
import {PricelistComponent} from "./pricelist/pricelist.component";
import {ServicesComponent} from "./services.component";
import {OnlajnKassyComponent} from "./onlajn-kassy/onlajn-kassy.component";

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
        path: 'onlajn-kassy',
        component: OnlajnKassyComponent,
        data: {
          title: 'Онлайн кассы сервис',
          metatags: {
            description: 'Сервисные услуги по онлайн кассам',
            keywords: ''
          }
        }
      },
      {
        path: 'pricelist',
        component: PricelistComponent,
        data: {
          title: 'Прайслист',
          metatags: {
            description: 'Наши цены',
            keywords: 'цены, стоимость услуг'
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
