import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from "./articles.service";
import {Router} from "@angular/router";
import {ArticleListItem} from "../../../../../src/app/blog/article";
import {MatPaginator, MatSort} from "@angular/material";
import {ArticleDataSource} from "./articles.datasource";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {fromEvent} from "rxjs/internal/observable/fromEvent";
import {merge} from "rxjs/internal/observable/merge";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {

  categoryId =0;

  articles: ArticleListItem[];
  dataSource: ArticleDataSource;

  displayedColumns = ['id', 'title'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private articleService: ArticlesService,
              private router: Router) { }

  ngOnInit() {
    this.dataSource =new ArticleDataSource(this.articleService);
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadArticles(this.categoryId, '', 'desc', 0, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  loadLessonsPage() {
    this.dataSource.loadArticles(
      this.categoryId,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex +1,
      this.paginator.pageSize);
  }

}
