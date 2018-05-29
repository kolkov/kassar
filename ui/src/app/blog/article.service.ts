import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Article, ArticleList} from "./article";
import {Observable} from "rxjs/internal/Observable";
import {Category, CategoryList} from "../catalog/cart-home.service";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  categories: Category[] =[];

  constructor(private http: HttpClient, private router: Router) { }

  get(id: string): Observable<Article> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<Article>('v1/public/article/' + id, {headers: headers});
  }

  getList(categoryPath: string): Observable<ArticleList> {
    if (this.categories.length == 0) return this.getCategories()
      .pipe(
        mergeMap(()=> this.doList(categoryPath))
      );
    else return this.doList(categoryPath)
  }

  doList(categoryPath: string): Observable<ArticleList>{
    const category = this.categories.find(x => x.path == categoryPath);
    const options = category.id ?
      { params: new HttpParams().set('category_id', category.id.toString()) } : {};
    return this.http.get<ArticleList>('v1/public/articles', options);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<CategoryList>("v1/public/article-categories")
      .pipe(
        tap(x => this.categories = x.items),
        map((x: CategoryList) => x.items)
      )
  }

  getByPath(path: string){
    return this.http.get<Category>("v1/public/article-category/" + path)
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
}
