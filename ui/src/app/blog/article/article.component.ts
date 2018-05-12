import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Article} from "../article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SEOService} from "../../seo.service";
import {Observable} from "rxjs/internal/Observable";
import {catchError, tap} from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article>;
  id: string;
  error: HttpErrorResponse;

  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: ArticleService,
    private seoService: SEOService,
    private router: Router
    ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.article$ = this.blogService.get(this.id).pipe(
      tap(x => {
        let tags = {
          description: x.description,
          keywords: x.keywords,
        };
        this.seoService.setSeoData(x.title, tags);
      }),
      catchError((err, caught) => {
        this.router.navigate(['/404']);
        return caught;
      })
    )



      /*.subscribe((data: Article) => {
        this.article = data;
        let tags = {
          description: data.description,
          keywords: data.keywords,
        };
        this.seoService.setSeoData(data.title, tags);
      },
        error => {
        this.error = error;
          this.article.title = "Ошибка";
          this.article.body = "Статья с такоим URL не найдена на сервере"
        }
      )*/
  }

}
