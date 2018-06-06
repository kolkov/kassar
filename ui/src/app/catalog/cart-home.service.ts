import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {Category, CategoryList, PageDescription} from "../models/category";

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
    "other": {
      heading: "Прочее",
      description: "Каталог прочего оборудования и материалов.",
      tags: {
        description: 'Прочее оборудование и програмное обеспечение',
        keywords: 'ящики для денег, прочие приспособления, все для онлайн касс'
      }
    }
  };

  categories: Category[] = [];

  constructor(private http: HttpClient, private router: Router) { this.getList()}

  getList(){
    return this.http.get<CategoryList>("v1/public/product-categories").pipe(
      tap(x => this.categories = x.items)
    );
  }

  getById(id: number){
    return this.http.get("v1/public/product-categories/" + id)
  }

  getByPath(path: string){
    return this.http.get<Category>("v1/public/product-category/" + path)
      .pipe(
        map(x => x.path === path),
        catchError((e: HttpErrorResponse) => {
          this.router.navigate(['404']);
          return of(e.status == 404)
        }))
  }

  checkPath(path: string) {
    return this.categories.find(x => x.path === path)
  }

  getPageDescription(id: string): Observable<PageDescription>{
    return new Observable<PageDescription>((observer) => {
      observer.next(this.pageDescriptions[id]);
    })
  }
}
