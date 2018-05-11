export class AdditionalOption {
  public id: number;
  public name: string;
  public description: string;
  public price: number;

  public updateFrom(src: AdditionalOption): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
  }
}
