import { Component, OnInit } from '@angular/core';
import {Article} from "../article";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {SEOService} from "../../seo.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article = {
    id: 0,
    path: '',
    title: '',
    introduction: '',
    date: '',
    body: ``,
  };

  id: string;
  error: HttpErrorResponse;
  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: ArticleService,
    private seoService: SEOService
    ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.blogService.get(this.id)
      .subscribe((data: Article) => {
        this.article = data;
        let tags = {
          description: 'test description',
          keywords: 'test tags, tags2'
        };
        this.seoService.setSeoData(data.title, tags);
      },
        error => {
        this.error = error;
          this.article.title = "Ошибка";
          this.article.body = "Статья с такоим URL не найдена на сервере"
        }
      )
  }

}
