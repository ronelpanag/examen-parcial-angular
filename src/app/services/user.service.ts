import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, first, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  users$: Observable<User[]>;
  api = 'https://randomuser.me/api';


  getUsers(amount: string, gender: string): Observable<User[]> {

    let url = `${this.api}`;

    if (amount) {
      url += `?results=${amount}`;
    }
    if (amount && gender) {
      url += `&gender=${gender}`;
    }
    if (!amount && gender) {
      url += `?gender=${gender}`;
    }

    this.users$ = this.http.get<User[]>(url)
                           .pipe(
                             shareReplay(),
                             catchError(this.handleError)
                           );
    return this.users$;
  }

  getUserById(id: any): Observable<User> {
    return this.users$
            .pipe(
              flatMap(u => u),
              first(user => user.id.name === id.name),
              catchError(this.handleError)
            );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg: string;
    if (errorResponse.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMsg = 'An error occurred:' + errorResponse.error.message;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
    }
    console.error(errorMsg);
    return throwError(errorMsg);
}
}
