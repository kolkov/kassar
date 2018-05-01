import {Component, OnInit} from '@angular/core';
import {Article, ArticleList} from "../article";
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: ArticleList = {
    items: [
      {
        id: 1,
        path: 'test',
        title: 'Онлайн-кассы в 2018 году: кто имеет право на отсрочку и налоговый вычет',
        date: '27.03.2018',
        body: 'По итогам первого года правила применения онлайн-касс уточнили. Некоторым категориям бизнеса предоставили дополнительную отсрочку и возможность получения налогового вычета на приобретение ККТ. Узнайте, попадаете ли вы под особые условия, и планируйте переход своевременно.',
      },
      {
        id: 0,
        path: 'kak-perejti-na-onlajn-kassy-poshagovyj-algoritm',
        title: 'Как перейти на онлайн-кассы: пошаговый алгоритм',
        date: '15.10.2016',
        body: 'Реформа 54-ФЗ состоялась. У вас есть небольшой период, чтобы подготовиться к переходу на новые правила применения ККТ.' +
        '  Первые шаги в этом направлении стоит сделать уже сейчас. Для начала нужно выбрать ОФД и запланировать модернизацию' +
        '  техники. Рассмотрим весь процесс перехода на онлайн-кассы по порядку.',
      }
    ]
    ,
    total: 10
  };


  constructor(private blogService: ArticleService) {
  }

  ngOnInit() {
    this.blogService.getList()
      .subscribe((data: ArticleList) =>
          this.articles = data,
        error => {
          //this.error = error;
          //this.article.title = "Ошибка";
          //this.article.body = "Статья с такоим URL не найдена на сервере"
        }
      )
  }

}
