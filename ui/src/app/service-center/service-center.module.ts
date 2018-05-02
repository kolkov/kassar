import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCenterRoutingModule } from './service-center-routing.module';
import { ServiceCenterComponent } from './service-center.component';
import { ServiceCenterHomeComponent } from './service-center-home/service-center-home.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceCenterRoutingModule
  ],
  declarations: [ServiceCenterComponent, ServiceCenterHomeComponent]
})
export class ServiceCenterModule { }
