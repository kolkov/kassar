import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  save(article){
    let body = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('v1/articles', body, {headers});
  }
}
