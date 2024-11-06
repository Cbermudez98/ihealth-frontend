import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../../shared/interfaces/ResponseAccess';
import { User } from '../../shared/interfaces/User';
import { Login } from '../../shared/interfaces/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;
  constructor() {}

  register(object: User): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(
      `${this.baseUrl}Users/Create`,
      object
    );
  }

  login(object: Login): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(
      `${this.baseUrl}auth/login`,
      object
    );
  }
}
