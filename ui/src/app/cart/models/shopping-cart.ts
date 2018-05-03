import {CartItem} from "./cart-item";

export class ShoppingCart {
  items: CartItem[] = new Array<CartItem>();
  deliveryOptionId: string;
  grossTotal: number = 0;
  deliveryTotal: number = 0;
  itemsTotal: number = 0;

  updateFrom(src: ShoppingCart){
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}
