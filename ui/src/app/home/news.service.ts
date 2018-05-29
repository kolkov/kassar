import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewsList} from "./news";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsList>{
    return this.http.get<NewsList>("v1/public/news")
  }
}
