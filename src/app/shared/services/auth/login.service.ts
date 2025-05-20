import { Injectable } from '@angular/core';
import { ResponseAccess } from '../../interfaces/ResponseAccess';
import { Login } from '../../interfaces/Login';
import { HttpService } from '../HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { StorageService } from '../storage/storage.service';
import { KEYS } from '../../../core/constants.enum';
import { User } from '../../interfaces/User';
import { JwtDecodeService } from '../jwt-decode/jwt-decode.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(

    private http: HttpService,

    private readonly storageService: StorageService,
    private readonly jwtDecodeService: JwtDecodeService

  ) {}

  async register(object: User): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}user`;;
    return (await this.http.request<ResponseAccess>(url, 'POST', object)).data;
  }

  async login(object: Login): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}auth`;
    const data = (await this.http.request<ResponseAccess>(url, 'POST', object)).data;


    this.storageService.set(KEYS.TOKEN, { [KEYS.TOKEN]: data.access_token });

  
    const role = this.jwtDecodeService.getRole(data.access_token);
    if (role) {
      this.storageService.set(KEYS.ROLE, { role });
    }

    const decodedToken = this.jwtDecodeService.decode(data.access_token);
    console.log('Token Decodificado:', decodedToken);

    return data;
  }

  getUserRoles(): string[] {
    const tokenData = this.storageService.get(KEYS.TOKEN);
    if (!tokenData || !tokenData[KEYS.TOKEN]) return [];

    try {
      const payload = JSON.parse(atob(tokenData[KEYS.TOKEN].split('.')[1]));
      console.log('Decoded Token Payload:', payload);
      return payload.roles || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }
}
