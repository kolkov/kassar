import {CartItem} from "./cart-item";
import {ICustomer, ICustomerAddress} from "./customer";
import {DaDataAddress} from "../../../../projects/kolkov/ngx-dadata/src/lib/models/data";

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
    fiasAddress: <DaDataAddress>{},
    address: <ICustomerAddress>{}
    /*address: {
      full: '',
      city: '',
      street: '',
      building: '',
      room: '',
      code: '',
      floor: '',
      entrance: '',
    }*/
  };
  confirmed = false;
  grossTotal = 0;
  deliveryTotal = 0;
  itemsTotal = 0;
  smsOption = false;
  callOption = false;
  note = '';

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
    this.smsOption = src.smsOption;
    this.callOption = src.callOption;
    this.note = src.note;
  }
}
