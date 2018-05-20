import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getAsyncToken(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user === null) return user;
    return user['token'] && user['token'];
  }
}
