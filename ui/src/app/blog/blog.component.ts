import {Component, OnInit} from '@angular/core';
import {ArticleService} from "./article.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(/*private articleService: ArticleService*/) { }

  ngOnInit() {
    //this.articleService.getCategories().subscribe()
  }

}
