import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleDetailsComponent} from "./article-details/article-details.component";
import {ArticlesComponent} from "./articles.component";

const routes: Routes = [
  {
    path: ':id',
    component: ArticleDetailsComponent
  },
  {
    path: '',
    component: ArticlesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
