import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  template: `
    <h1 class="mat-h1">Главная страница</h1>
    <p>Круто! {{userName}}, Вы с нами!</p>`,
  styles: []
})
export class HomeComponent implements OnInit{
  userName = '';

  constructor(private authService: AuthService) {

  }

  ngOnInit(){
    this.userName = this.authService.username;
  }
}
