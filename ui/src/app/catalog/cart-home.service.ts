import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";

export interface PageDescription {
  heading: string;
  description: string;
  tags: TagItem;
}

export interface TagItem {
  description: string;
  keywords: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartHomeService {

  private pageDescriptions = {
    "kontrolno-kassovaya-tekhnika": {
      heading: "Контрольно-кассовая техника",
      description: "Контрольно-кассовая техника (ККТ) — неотъемлемый атрибут любого магазина: без нее не будет функционировать касса, а торговля будет парализована. Эти устройства, которые раньше именовались как «фискальные регистраторы», предназначены для регистрации процесса продажи товара и печати кассового чека. Они управляются при помощи персональных компьютеров, которые передают в ККТ необходимые команды",
      tags: {
        description: 'Контрольно-кассовая техника (ККТ), онлайн кассы, продажа',
        keywords: 'ккт, кассы, онлайн кассы'
      }
    },
    "skanery-shtrikh-kodov": {
      heading: "Сканнеры штрих кодов",
      description: "Сканеры штрих-кодов — обязательные инструменты в работе любого магазина. С их помощью на кассе считывается информация о товаре, нанесенная в качестве штрих-кода на его упаковку.",
      tags: {
        description: 'Сканеры штрих-кодов для онлайн касс, подходят для ЕГАИС',
        keywords: 'сканнеры штрих кодов, сканеры, сканеры для ккт'
      }
    },
    "prochee": {
      heading: "Прочее",
      description: "Каталог прочего оборудования и материалов.",
      tags: {
        description: 'Прочее оборудование и програмное обеспечение',
        keywords: 'ящики для денег, прочие приспособления, все для онлайн касс'
      }
    }
  };

  constructor() { }

  getPageDescription(id: string): Observable<PageDescription>{
    return new Observable<PageDescription>((observer) => {
      observer.next(this.pageDescriptions[id]);
    })
  }
}
