import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CartHomeService} from "./cart-home.service";

@Injectable()
export class CatalogGuard implements CanActivate {

  constructor(private cartHomeService: CartHomeService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const path = next.params['id'];
    return this.checkPath(path);
  }

  checkPath(path: string) {
    let result = this.cartHomeService.checkPath(path);

    if (result) {
      return true;
    } else {
      return this.cartHomeService.getByPath(path)
    }
  }
}
