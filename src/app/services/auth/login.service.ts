import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../../shared/interfaces/ResponseAccess';
import { Login } from '../../shared/interfaces/Login';
import { HttpService } from '../HTTP/http.service';
import { User } from '../../shared/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private Http: HttpService) {}

  register(object: User): Observable<ResponseAccess> {
    return this.Http.request<ResponseAccess>('user', 'POST', object);
  }

  login(object: Login): Observable<ResponseAccess> {
    return this.Http.request<ResponseAccess>('auth/login', 'POST', object);
  }
}
