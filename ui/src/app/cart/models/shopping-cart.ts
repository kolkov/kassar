import {CartItem} from "./cart-item";
import {ICustomer} from "./customer";

export class ShoppingCart {
  items: CartItem[] = [];
  deliveryOptionId: number;
  additionalOptionId: number;
  paymentOptionId: number;
  customer: ICustomer = <ICustomer>{
    fio: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    address: {
      full: '',
      city: '',
      street: '',
      building: '',
      code: '',
      floor: '',
      entrance: '',
  }
  };
  // address: CustomerAddress = <CustomerAddress>{};
  confirmed = false;
  grossTotal = 0;
  deliveryTotal = 0;
  itemsTotal = 0;

  updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.additionalOptionId = src.additionalOptionId;
    this.paymentOptionId = src.paymentOptionId;
    this.customer = src.customer;
    this.confirmed = src.confirmed;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
