import {CartItem} from "./cart-item";
import {ICustomer} from "./customer";

export class ShoppingCart {
  items: CartItem[] = [];//new Array<CartItem>();
  deliveryOptionId: number;
  additionalOptionId: number;
  paymentOptionId: number;
  customer: ICustomer = <ICustomer>{
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      city: '',
      street: '',
      building: ''
  }
  };
  //address: CustomerAddress = <CustomerAddress>{};
  confirmed: boolean = false;
  grossTotal: number = 0;
  deliveryTotal: number = 0;
  itemsTotal: number = 0;

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
