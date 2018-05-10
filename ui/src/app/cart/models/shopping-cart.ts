import {CartItem} from "./cart-item";
import {Customer} from "./customer";

export class ShoppingCart {
  items: CartItem[] = new Array<CartItem>();
  deliveryOptionId: string;
  additionalOptionId: string;
  paymentOptionId: string;
  customerOptions: Customer;
  confirmed: boolean = false;
  grossTotal: number = 0;
  deliveryTotal: number = 0;
  itemsTotal: number = 0;

  updateFrom(src: ShoppingCart){
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.additionalOptionId = src.additionalOptionId;
    this.paymentOptionId = src.paymentOptionId;
    this.confirmed = src.confirmed;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
