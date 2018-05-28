import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {jwtOptionsFactory} from "./app-jwt.factory";
import {TokenService} from "./auth/token.service";
import {HttpClientModule} from "@angular/common/http";
import {ArticlesComponent} from './articles/articles.component';
import {PublicComponent} from './layout/public/public.component';
import {PrivateComponent} from './layout/private/private.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AngularEditorModule} from "../../../kolkov/angular-editor/src/lib/angular-editor.module";
import {ArticleDetailsComponent} from './articles/article-details/article-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticlesComponent,
    PublicComponent,
    PrivateComponent,
    NotFoundComponent,
    ArticleDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    AngularEditorModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
