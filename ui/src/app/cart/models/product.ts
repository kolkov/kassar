import {Properties} from "./properties";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  url: string;
  properties: Properties[];

  updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
    this.img = src.img;
    this.url = src.url;
    this.properties = src.properties;

  }
}

export class ProductList {
  items: Product[];
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
}
