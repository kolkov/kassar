import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import {ArticleDetailsComponent} from "./article-details/article-details.component";
import {ArticlesComponent} from "./articles.component";
import {MatModule} from "../root/mat/mat.module";
import {SharedModule} from "../shared/shared.module";
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatModule,
    ArticlesRoutingModule
  ],
  declarations: [ArticlesComponent, ArticleDetailsComponent, ArticleListComponent]
})
export class ArticlesModule { }
