import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OrderCompleteComponent} from './components/order-complete/order-complete.component';

import {LocalStorageService} from "./services/storage.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {ProductsService} from "./services/products.service";
import {DeliveryOptionsService} from "./services/delivery-options.service";
import {PopulatedCartGuard} from "./guards/populated-cart.guard";
import {CartComponent} from './components/cart/cart.component';
import {CartServicesComponent} from './components/cart-services/cart-services.component';
import {CartDeliveryComponent} from './components/cart-delivery/cart-delivery.component';
import {CartPaymentComponent} from './components/cart-payment/cart-payment.component';
import {CartConfirmComponent} from './components/cart-confirm/cart-confirm.component';
import {StoreFrontComponent} from "./components/store-front/store-front.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {FormsModule} from "@angular/forms";
import {StoreCatalogComponent} from './components/store-catalog/store-catalog.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import {NgxDaDataModule} from "../../../projects/kolkov/ngx-dadata/src/lib/ngx-da-data.module";
import { StoreReviewComponent } from './components/store-review/store-review.component';
import { StoreCustomerReviewsComponent } from './components/store-customer-reviews/store-customer-reviews.component';
import { StoreDescriptionComponent } from './components/store-description/store-description.component';
import { StoreAccessoriesComponent } from './components/store-accessories/store-accessories.component';
import { StoreQuestionAnswerComponent } from './components/store-question-answer/store-question-answer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDaDataModule,
    CartRoutingModule
  ],
  declarations: [
    StoreFrontComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderCompleteComponent,
    CartComponent,
    CartServicesComponent,
    CartDeliveryComponent,
    CartPaymentComponent,
    CartConfirmComponent,
    StoreCatalogComponent,
    StoreDetailsComponent,
    StoreReviewComponent,
    StoreCustomerReviewsComponent,
    StoreDescriptionComponent,
    StoreAccessoriesComponent,
    StoreQuestionAnswerComponent
  ],
  exports: [
    StoreFrontComponent,
    ShoppingCartComponent,
    StoreCatalogComponent,
    StoreDetailsComponent,
    StoreReviewComponent,
    StoreCustomerReviewsComponent,
    StoreDescriptionComponent,
    StoreAccessoriesComponent,
    StoreQuestionAnswerComponent
  ],
  providers: [PopulatedCartGuard, LocalStorageService, ShoppingCartService, ProductsService, DeliveryOptionsService]
})
export class CartModule {
}
