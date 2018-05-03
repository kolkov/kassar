export class Properties {
  public name: string;
  public value: number;

  public updateFrom(src: Properties): void {
    this.name = src.name;
    this.value = src.value;
  }
}
