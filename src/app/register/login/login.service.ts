import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  
  getTiersByIdDigital(token:any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization':'Bearer '+token
      })
    };
    let body={
  }
    return this.http.post("https://openbank.stb.com.tn/api/",JSON.stringify(body), httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  // a: string,b: string
  AuthentifiactionAD() {

    const body = new URLSearchParams();
    body.set('username', '');
    body.set('password', '');
    body.set('grant_type', 'password');
    body.set('scope', '');
    body.set('client_secret', '');
    body.set('client_id', '');
    // body.set('response_type', 'token id_token');
   
     let headers= new HttpHeaders({
       
    
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

    })
    return this.http.post<any>('api_connexion',body.toString(), {
      headers,
     
      observe: 'response',
      reportProgress: true,
      
    }).pipe(
      // retry(1),

      catchError(this.handleError)
    );
  }



  Authentifiaction(a: string,b: string) {

    const body = new URLSearchParams();
    body.set('username', a);
    body.set('password', b);
    body.set('grant_type', 'password');
    body.set('scope', '');
    body.set('client_id', '');
    body.set('response_type', 'token id_token');
    return this.http.post<any>('api_token',body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      observe: 'response',
      reportProgress: true
    }).pipe(
      // retry(1),

      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:', error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // console.error(         `Backend returned code ${error.status}, ` +     `body was: ${error.error}`);
    }

    // localStorage.setItem('error', error.message);
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

}
