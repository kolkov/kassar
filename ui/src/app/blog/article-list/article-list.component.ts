import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ArticleListItem} from "../article";
import {ArticleService} from "../article.service";
import {Observable} from "rxjs/internal/Observable";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../catalog/cart-home.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<ArticleListItem[]>;
  category: Category;

  constructor(private blogService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const path = this.route.snapshot.params['id'];

    this.articles$ = this.blogService.getList(path).pipe(
      tap(() => this.category = this.blogService.checkPath(path)),
      map(x => x.items)
    );
  }
}
