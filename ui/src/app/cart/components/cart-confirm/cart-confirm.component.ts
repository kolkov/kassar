import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-confirm',
  templateUrl: './cart-confirm.component.html',
  styleUrls: ['./cart-confirm.component.scss']
})
export class CartConfirmComponent implements OnInit {
  text: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  confirmedCart( ){
    this.router.navigate(['/order/complete'], { replaceUrl: false });
  }
}
