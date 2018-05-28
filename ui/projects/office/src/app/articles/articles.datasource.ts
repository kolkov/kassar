import {ArticleList, ArticleListItem} from "../../../../../src/app/blog/article";
import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {CollectionViewer} from "@angular/cdk/collections";
import {Observable} from "rxjs/internal/Observable";
import {ArticlesService} from "./articles.service";
import {MatPaginator} from "@angular/material";


export class ArticleDataSource implements DataSource<ArticleListItem> {

  private articlesSubject = new BehaviorSubject<ArticleListItem[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private articleService: ArticlesService){

  }

  get paginator(): MatPaginator | null { return this._paginator; }
  set paginator(paginator: MatPaginator|null) {
    this._paginator = paginator;
    //this._updateChangeSubscription();
  }
  private _paginator: MatPaginator|null;

  loadArticles(categoryId:number,
              filter:string,
              sortDirection:string,
              pageIndex:number,
              pageSize:number) {

    this.loadingSubject.next(true);

    this.articleService.findArticles(categoryId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((articlesList: ArticleList) => {
        this.articlesSubject.next(articlesList.items);
        this._updatePaginator(articlesList.total_count)
      });
  }

  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      if (!this.paginator) { return; }

      this.paginator.length = filteredDataLength;

      // If the page index is set beyond the page, reduce it to the last page.
      if (this.paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
        this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
      }
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<ArticleListItem[]> {
    console.log("Connecting data source");
    return this.articlesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.articlesSubject.complete();
    this.loadingSubject.complete();
  }
}

