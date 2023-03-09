import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  loggedUser: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(
    userMail: string,
    userPassword: string
  ): Observable<any> {
    const payload: any = {
      userMail,
      userPassword
    };
    return this.httpClient.post<any>(`${environment.api_path}/login`, payload)
      .pipe(
        map((response: any) => {
          this.loggedUser = response.loggedUser;
          return response;
        })
      )
  }

  logout(): void {
    this.loggedUser = null;
  }
}
