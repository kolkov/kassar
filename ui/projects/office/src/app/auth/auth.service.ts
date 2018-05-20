import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Injectable} from "@angular/core";
import {User} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  public username: string;
  public userId: string;
  public firstLogin: string;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.getToken();
  }

  login(user: User) {
    let body = JSON.stringify({username: user.userName, password: user.password});
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post<AuthResponse>('/v1/auth', body, {headers}).pipe(
      tap((response: AuthResponse) => {
        const token = response.token;
        if (token) {
          // set token property
          this.token = token;
          this.saveToken(this.token);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      })
    ).subscribe();

  }

  logout() {
    this.token = null;
    this.userId = null;
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.token || this.jwtHelper.isTokenExpired(this.token, 0)) {
      return false;
    }
    return !!this.userId;
  }

  getUID(): number {
    return parseInt(this.userId);
  }

  getToken() {
    // get token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
    this.userId = currentUser && currentUser.userId;
    return this.token;
  }

  saveToken(jwt) {
    let decodedToken = this.jwtHelper.decodeToken(jwt);
    this.username = decodedToken.username;
    this.userId = decodedToken.id;
    this.firstLogin = decodedToken.first_login;
    // store username and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify({username: this.username, userId: this.userId, token: jwt}));
  }
}
