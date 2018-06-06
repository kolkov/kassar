import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ArticleListItem} from "../article";
import {ArticleService} from "../article.service";
import {Observable} from "rxjs/internal/Observable";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {SEOService} from "../../seo.service";
import {Category, TagItem} from "../../models/category";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<ArticleListItem[]>;
  category: Category = {id: 0, name: ''};

  constructor(private blogService: ArticleService, private route: ActivatedRoute, private seoService: SEOService, private router: Router) {
  }

  ngOnInit() {
    const path = this.route.snapshot.params['id'];

    this.articles$ = this.blogService.getList(path).pipe(
      tap(() => {
        this.category = this.blogService.checkPath(path);
        if (!this.category) {
          this.router.navigate(['/404']);
        } else {
          const tags: TagItem = {description: this.category.metaDescription, keywords: this.category.metaKeywords};
          this.seoService.setSeoData(this.category.name, tags);
        }
      }),
      map(x => x.items)
    );
  }
}
