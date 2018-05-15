import {Component, OnInit} from '@angular/core';
import {NewsService} from "../news.service";
import {NewsList} from "../news";

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  news: NewsList = new NewsList();

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews()
      .subscribe((data: NewsList) => {
        this.news = data;
      })
  }

}
