import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "./articles.service";
import {Router} from "@angular/router";
import {Article, ArticleList, ArticleListItem} from "../../../../../src/app/blog/article";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: ArticleListItem[];

  displayedColumns = ['id', 'title'];

  constructor(private articleService: ArticlesService,
              private router: Router) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(){
    this.articleService.getList().subscribe(
      (data: ArticleList) => this.articles = data.items
    );
  }

}
