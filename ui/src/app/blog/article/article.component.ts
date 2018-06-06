import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Article} from "../article";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SEOService} from "../../seo.service";
import {Observable} from "rxjs/internal/Observable";
import {catchError, map, tap} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";

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
    private router: Router,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.article$ = this.blogService.get(this.id).pipe(
      map((x: Article) => {
        x.safeHTML = this.sanitizer.bypassSecurityTrustHtml(x.body);
        return x;
      }),
      tap(x => {
        let tags = {
          description: x.metaDescription,
          keywords: x.metaKeywords,
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
          metaDescription: data.metaDescription,
          metaKeywords: data.metaKeywords,
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
