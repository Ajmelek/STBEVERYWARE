import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  getTiersByIdDigital(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    let body = {};
    return this.http.post("https://openbank.stb.com.tn/api/", JSON.stringify(body), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  AuthentifiactionAD() {
    const body = new URLSearchParams();
    body.set('username', '');
    body.set('password', '');
    body.set('grant_type', 'password');
    body.set('scope', '');
    body.set('client_secret', '');
    body.set('client_id', '');

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    return this.http.post<any>('api_connexion', body.toString(), {
      headers,
      observe: 'response',
      reportProgress: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  Authentifiaction(username: string, password: string) {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<any>('http://localhost:5082/api/Client/login', loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json' // Match Swagger's Content-Type
      }),
      observe: 'response',
      reportProgress: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  AuthentifiactionAdmin(username: string, password: string) {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<any>('http://localhost:5082/api/Admin/login', loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response',
      reportProgress: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  AuthentifiactionSuperAdmin(username: string, password: string) {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<any>('http://localhost:5082/api/SuperAdmin/login', loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response',
      reportProgress: true
    }).pipe(
      catchError(this.handleError)
    );
  }
}