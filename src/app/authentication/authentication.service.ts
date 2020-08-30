import { Token } from './../models/Token.model';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated: Observable<boolean>;
  public currentUser: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
      this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
      this.currentUser = new BehaviorSubject<any>(this.getUser());
      this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  public get isAuthenticatedStatus() {
      return this.isAuthenticatedSubject.value;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUser(): object {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null) {
      return userData;
    } else {
      return {};
    }
  }

  public getCurrentUserSubject() {
    return this.currentUser;
  }

  login(username, password) {

    const header = new HttpHeaders().append('Accept', 'application/json')
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append( 'No-Auth', 'True');

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(environment.apiUrl + 'token', body.toString(), {headers: header})
      .pipe(map(response => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const parsedJSON = response as Token;
          if (parsedJSON.token !== 'no token found') {
            localStorage.setItem('token', parsedJSON.token);
            this.isAuthenticatedSubject.next(!!parsedJSON.token);
            this.getCurrentUser();
            return parsedJSON.token;
          }
          console.log('login failed');
          // TODO This is actually an error
          return parsedJSON.token;
      }));
  }

  public getCurrentUser() {
    const header = new HttpHeaders().append('Accept', 'application/json')
    .append( 'No-Auth', 'True');
    return this.http.get(environment.apiUrl + 'api/users/user')
      .pipe(map(userData => {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.currentUser.next(userData);
      }));
  }

  signUp(user){
    console.log(user);
    return this.http.post(environment.apiUrl + 'users', user);
  }

  delete(id) {
    return this.http.delete(environment.apiUrl + 'users/${id}');
  }

  logout() {
    this.http.post(environment.apiUrl + 'logout', '').pipe(response => {
      // Empty localstorage if logout is successful
      console.log(response);
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
      return response;
    }).subscribe();
  }
}

