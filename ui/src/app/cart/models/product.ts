export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;

  updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;

  }
}
