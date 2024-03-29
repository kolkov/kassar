import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Article, ArticleList} from "../../../../../src/app/blog/article";
import {map} from "rxjs/operators";
import {Category, CategoryList} from "../../../../../src/app/models/category";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getList(): Observable<ArticleList> {
    return this.http.get<ArticleList>("v1/articles");
  }

  getOne(id: string): Observable<Article> {
    return this.http.get<Article>("v1/articles/" + id);
  }

  save(article) {
    const body = JSON.stringify(article);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (article.id !== 0) {
      return this.http.patch('v1/articles/' + article.id, body, {headers});
    } else {

      return this.http.post('v1/articles', body, {headers});
    }
  }

  findProducts(
    categoryId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<ArticleList> {

    return this.http.get<ArticleList>('v1/articles', {
      params: new HttpParams()
        .set('categoryId', categoryId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('per_page', pageSize.toString())
    });
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<CategoryList>("v1/public/article-categories")
      .pipe(
        map( (x: CategoryList) => x.items))
  }
}
