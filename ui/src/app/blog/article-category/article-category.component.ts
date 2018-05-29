import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../article.service";
import {Observable} from "rxjs/internal/Observable";
import {Category} from "../../catalog/cart-home.service";

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss']
})
export class ArticleCategoryComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.categories$ = this.articleService.getCategories();
  }

}
