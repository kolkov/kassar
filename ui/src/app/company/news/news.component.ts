import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../home/news.service";
import {NewsList} from "../../home/news";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: NewsList = new NewsList();

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews()
      .subscribe((data: NewsList) => {
        this.news = data;
      })
  }


}
