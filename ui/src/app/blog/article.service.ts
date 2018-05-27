import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Article, ArticleList} from "./article";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Article> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<Article>('v1/article/' + id, {headers: headers});
  }

  getList(): Observable<ArticleList> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<ArticleList>('v1/articles', {headers: headers});
  }
}
