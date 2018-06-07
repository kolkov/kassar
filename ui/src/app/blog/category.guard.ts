import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ArticleService} from "./article.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {

  constructor(private articleService: ArticleService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const path = next.params['id'];
    return this.checkPath(path);
  }

  checkPath(path: string) {
    let result = this.articleService.checkPath(path);

    if (result) {
      return true;
    } else {
      return this.articleService.getByPath(path)
    }
  }
}
