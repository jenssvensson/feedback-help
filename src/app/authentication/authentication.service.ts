import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private isAuthenticatedSubject: BehaviorSubject<boolean>;
    public isAuthenticated: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }

    public get isAuthenticatedStatus() {
        return this.isAuthenticatedSubject.value;
    }

    public getToken(): string {
      return localStorage.getItem('token');
    }

    login(username, password) {

      const header = new HttpHeaders().append('Accept', 'text/plain')
          .append('Content-Type', 'application/x-www-form-urlencoded')
          .append( 'No-Auth', 'True');

      const body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);

      return this.http.post(`http://localhost:8080/token`, body.toString(), {headers: header, responseType: 'text'})
        .pipe(map(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', token);
            this.isAuthenticatedSubject.next(!!token);
            return token;
        }));
      }

    logout() {
        // remove user from local storage
        return this.http.post('http://localhost:8080/logout', '').pipe(response => {
          // Empty localstorage if logout is successful
          localStorage.removeItem('token');
          this.isAuthenticatedSubject.next(false);
          return response;
      });
    }
}

