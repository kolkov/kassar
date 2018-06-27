import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {PrivateComponent} from "./layout/private/private.component";
import {PublicComponent} from "./layout/public/public.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [AuthGuard],
    children: [
      /*...ArticlesModule,*/
      {
        path: 'articles',
        loadChildren: './articles/articles.module#ArticlesModule'
      },
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
