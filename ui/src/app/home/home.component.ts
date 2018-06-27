import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loaded = false;
  constructor() {
  }

  ngOnInit() {
  }

  onLoad() {
    this.loaded = true;
  }

}
