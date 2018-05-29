import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./blog.component";
import {BlogHomeComponent} from "./blog-home/blog-home.component";
import {ArticleComponent} from "./article/article.component";
import {ArticleListComponent} from "./article-list/article-list.component";
import {CategoryGuard} from "./category.guard";

const routes: Routes = [
  {
    path: 'articles',
    component: BlogComponent,
    data: {

    },
    children: [
      {
        path: ':id/:id',
        component: ArticleComponent
      },
      {
        path: ':id',
        component: ArticleListComponent,
        canActivate: [CategoryGuard],
      },
      {
        path: '',
        component: BlogHomeComponent,
        data: {
          title: 'Статьи и материалы',
          metatags: {
            description: 'Статьи и материалы по теме онлайн касс и прочего торгового оборудования.',
            keywords: 'касса, онлайн-касса, ккт, обслуживание, установка, сервисб статьи'
          },
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
