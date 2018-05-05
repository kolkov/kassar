import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";

export interface PageDescription {
  heading: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartHomeService {

  private pageDescriptions = {
    "kontrolno-kassovaya-tekhnika": {
      heading: "Контрольно-кассовая техника",
      description: "Контрольно-кассовая техника (ККТ) — неотъемлемый атрибут любого магазина: без нее не будет функционировать касса, а торговля будет парализована. Эти устройства, которые раньше именовались как «фискальные регистраторы», предназначены для регистрации процесса продажи товара и печати кассового чека. Они управляются при помощи персональных компьютеров, которые передают в ККТ необходимые команды",
    },
    "skanery-shtrikh-kodov": {
      heading: "Сканнеры штрих кодов",
      description: "Сканеры штрих-кодов — обязательные инструменты в работе любого магазина. С их помощью на кассе считывается информация о товаре, нанесенная в качестве штрих-кода на его упаковку.",
    },
    "prochee": {
      heading: "Прочее",
      description: "Каталог прочего оборудования и материалов.",
    }
  };

  constructor() { }

  getPageDescription(id: string): Observable<PageDescription>{
    return new Observable<PageDescription>((observer) => {
      observer.next(this.pageDescriptions[id]);
    })
  }
}
