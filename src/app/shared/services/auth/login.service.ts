import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../../interfaces/ResponseAccess';
import { Login } from '../../interfaces/Login';
import { HttpService } from '../HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { StorageService } from '../storage/storage.service';
import { KEYS } from '../../../core/constants.enum';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private Http: HttpService, private readonly storageService: StorageService) {}

  register(object: User): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}user`
    return this.Http.request<ResponseAccess>(url, 'POST', object);
  }

  async login(object: Login): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}auth`
    const data =  await this.Http.request<ResponseAccess>(url, 'POST', object);
    this.storageService.set(KEYS.TOKEN, { [KEYS.TOKEN]: data.data.access_token });
    return data;
  }
}
