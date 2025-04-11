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
  constructor() {}

  getUserRoles(): string[] {
    const userJson = localStorage.getItem('user');

    if (!userJson) {
      console.warn('No se encontró información del usuario en localStorage');
      return [];
    }

    try {
      const user = JSON.parse(userJson);



      const roleId = user.role?.id;

      const roleMap: Record<number, string> = {
        1: 'admin',
        2: 'psicologo',
        3: 'user',

      };

      const roleName = roleMap[roleId];

      if (!roleName) {
        console.warn('Rol no reconocido para ID:', roleId);
        return [];
      }

      return [roleName];
    } catch (err) {
      console.error('Error al parsear el usuario desde localStorage', err);
      return [];
    }
  }
}
