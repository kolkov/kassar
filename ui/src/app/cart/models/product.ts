import {Properties} from "./properties";

export class Product {
  id: number;
  categoryId: number;
  brandId: number;
  name: string;
  product_type: string;
  description: string;
  price: number;
  metaDescription: string;
  metaKeywords: string;
  img: string;
  url: string;
  properties: Properties[];

  updateFrom(src: Product): void {
    this.id = src.id;
    this.brandId = src.brandId;
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
