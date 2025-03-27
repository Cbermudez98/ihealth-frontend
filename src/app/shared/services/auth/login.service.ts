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
    private Http: HttpService,
    private readonly storageService: StorageService,
    private readonly jwtDecodeService: JwtDecodeService
  ) {}

  async register(object: User): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}user`;
    return (await this.Http.request<ResponseAccess>(url, 'POST', object)).data;
  }

  async login(object: Login): Promise<ResponseAccess> {
    const url = `${environment.apiUrl}auth`;
    const data = (await this.Http.request<ResponseAccess>(url, 'POST', object)).data;

    // Guardar el token en el almacenamiento
    this.storageService.set(KEYS.TOKEN, { [KEYS.TOKEN]: data.access_token });

    // Decodificar el token
    const decodedToken = this.jwtDecodeService.decode(data.access_token);
    console.log('Token Decodificado:', decodedToken);

    return data;
  }
}
