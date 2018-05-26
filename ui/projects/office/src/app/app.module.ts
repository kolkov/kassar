import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {jwtOptionsFactory} from "./app-jwt.factory";
import {TokenService} from "./auth/token.service";
import {HttpClientModule} from "@angular/common/http";
import { ArticlesComponent } from './articles/articles.component';
import { PublicComponent } from './layout/public/public.component';
import { PrivateComponent } from './layout/private/private.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticlesComponent,
    PublicComponent,
    PrivateComponent
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
    MatSelectModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
