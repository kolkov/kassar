import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import {BlogHomeComponent} from './blog-home/blog-home.component';
import {ArticleComponent} from './article/article.component';
import {ArticleListComponent} from './article-list/article-list.component';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { RouteTransformerDirective } from './article/route-transformer.directive';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, BlogHomeComponent, ArticleComponent, ArticleListComponent, ArticleCategoryComponent, RouteTransformerDirective]
})
export class BlogModule { }
